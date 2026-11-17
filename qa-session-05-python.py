"""Verify the classroom Python without installing the SDK or making network calls."""
import contextlib
import io
import subprocess
import sys
import tempfile
from pathlib import Path
from types import SimpleNamespace
from zipfile import ZipFile

from session05_runtime import OfflineClient, request

root = Path(__file__).resolve().parent

# Running from an extracted ZIP verifies the actual student bundle, not just source.
with tempfile.TemporaryDirectory() as folder:
    with ZipFile(root / "session-05-python.zip") as bundle:
        names = set(bundle.namelist())
        assert names == {"session05_runtime.py", "string_foundations.py", "first_openai_request.py",
                         "few_shot_labels.py", "conversation_context.py", "response_chain.py",
                         "session-05-python-guide.txt"}
        bundle.extractall(folder)
    expectations = {
        "string_foundations.py": "Python variables\ntopic",
        "first_openai_request.py": "A variable is a name your program uses to store and find a value.",
        "few_shot_labels.py": "Returned label: HOURS\nMatches this question's expected label: True",
        "conversation_context.py": "Follow-up answer: Hello, Amina!",
        "response_chain.py": "Hello, Amina!",
    }
    for name, expected in expectations.items():
        completed = subprocess.run([sys.executable, name], cwd=folder, capture_output=True, text=True, check=True)
        assert expected in completed.stdout, (name, completed.stdout)
        if name != "string_foundations.py":
            assert "OFFLINE MODE" in completed.stdout
    retired = subprocess.run([sys.executable, "first_openai_request.py", "--model", "gpt-3.5-turbo"],
                             cwd=folder, capture_output=True, text=True)
    assert retired.returncode != 0 and "retired" in retired.stderr

# Check the semantic difference between an explicit history and a missing one.
client = OfflineClient()
full = [{"role": "user", "content": "My name is Bola."},
        {"role": "assistant", "content": "Thanks."},
        {"role": "user", "content": "Greet me by name."}]
assert client.responses.create(model="gpt-6-astra", input=full).output_text == "Hello, Bola!"
assert client.responses.create(model="gpt-6-astra", input=full[-1:]).output_text == "What name would you like me to use?"
first = client.responses.create(model="gpt-6-astra", input="My name is Chidi.", store=True)
second = client.responses.create(model="gpt-6-astra", input="Greet me by name.", previous_response_id=first.id)
assert second.output_text == "Hello, Chidi!"
unsaved = client.responses.create(model="gpt-6-astra", input="My name is Amina.", store=False)
try:
    client.responses.create(model="gpt-6-astra", input="Greet me by name.", previous_response_id=unsaved.id)
    raise AssertionError("An unsaved mock response must not be available for linking.")
except ValueError:
    pass

# Capture actual SDK-shaped options with an injected local client.
captured = []
def create(**options):
    captured.append(options)
    return SimpleNamespace(status="completed", output_text="Local test response")
fake = SimpleNamespace(responses=SimpleNamespace(create=create))
request(fake, "gpt-6-astra", instructions="Short answer", input="Hello", store=False)
assert captured[-1] == {"model": "gpt-6-astra", "instructions": "Short answer", "input": "Hello",
                        "store": False, "max_output_tokens": 512, "reasoning": {"effort": "low"}}
request(fake, "custom-model", instructions="Repeat me", input="Follow up", store=True,
        previous_response_id="test_previous")
assert captured[-1]["previous_response_id"] == "test_previous"
assert captured[-1]["instructions"] == "Repeat me"
assert "reasoning" not in captured[-1]

for status, text in [("incomplete", "partial"), ("completed", "")]:
    fake_bad = SimpleNamespace(responses=SimpleNamespace(create=lambda **kw: SimpleNamespace(status=status, output_text=text)))
    try:
        request(fake_bad, "gpt-6-astra", instructions="", input="Hello")
        raise AssertionError("Incomplete/empty output must be reported.")
    except SystemExit as error:
        assert "Response is not completed" in str(error) or "No text output" in str(error)

# Errors expose a useful diagnosis, without reproducing raw secret-bearing bodies.
def failing(**options):
    error_type = type("AuthenticationError", (Exception,), {})
    raise error_type("RAW_SECRET_MUST_NEVER_APPEAR")
try:
    request(SimpleNamespace(responses=SimpleNamespace(create=failing)), "gpt-6-astra", instructions="", input="Hello")
    raise AssertionError("Authentication failure must be reported.")
except SystemExit as error:
    assert "private API key" in str(error)
    assert "RAW_SECRET" not in str(error)

print("Passed: extracted bundle, five runnable examples, explicit/missing context, response links,")
print("request fields, model options, retired IDs, incomplete/empty output, and private error reporting.")
print("No real API requests were made.")
