"""Session 5: a first request, offline by default.

python first_openai_request.py          -> local scripted result, zero API calls
python first_openai_request.py --live   -> one real API request

Keep session05_runtime.py in the same folder. The helper obtains credentials
privately only in live mode. Do not paste a key into this source file.
"""

# Import classroom setup and request handling. The real SDK uses OpenAI().
from session05_runtime import prepare, request

# Receive the configured client and chosen model ID from the helper.
client, model = prepare("First request: --live makes one real API request.")

# A string contains the task. It is a value stored in a variable.
prompt = "Explain a Python variable in one sentence."

# The helper calls client.responses.create with these fields and a token bound.
# Named arguments explain which value goes in which request field.
response = request(
    client,
    model,
    instructions="Teach a beginner using simple words.",
    input=prompt,
    store=False,
)

# output_text is an attribute of the returned object, not a new model call.
print(response.output_text)

# Try changing prompt. Offline mode supports variable and API explanations.
# Live output may vary. Check meaning, evidence, and instruction following.
