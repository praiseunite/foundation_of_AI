"""Session 5: supported context linking with previous_response_id.

python response_chain.py          -> stored local stand-in, zero API calls
python response_chain.py --live   -> two real API requests, store=True

Live response objects are saved under the API's response-retention rules.
Use fictional inputs and review project settings before running live.
"""

from session05_runtime import prepare, request

client, model = prepare("Response chain: --live makes two real API requests with store=True.")
rules = "Use simple words. Use only a name supplied in this conversation; ask if it is missing."

first = request(
    client, model, instructions=rules,
    input="My name is Amina.", store=True,
)

# first.id identifies the earlier response; it is not an API key.
# Repeat instructions: previous instructions do not automatically carry over.
second = request(
    client, model, instructions=rules,
    previous_response_id=first.id,
    input="Greet me by name.", store=True,
)
print(second.output_text)

# The new request links to supported prior response context.
# Do not also pass the conversation parameter with previous_response_id.
# Linking history still uses input tokens; it does not make context free.
