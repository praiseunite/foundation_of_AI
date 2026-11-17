"""Package the classroom files without credentials, environment files, or caches."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parent
files = ["session05_runtime.py", "string_foundations.py", "first_openai_request.py",
         "few_shot_labels.py", "conversation_context.py", "response_chain.py",
         "session-05-python-guide.txt"]
with ZipFile(root / "session-05-python.zip", "w", compression=ZIP_DEFLATED) as bundle:
    for name in files:
        bundle.write(root / name, arcname=name)
print("Packaged 6 Python files and the classroom guide.")
