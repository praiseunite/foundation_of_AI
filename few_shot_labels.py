"""Session 5: few-shot examples and an allowed-label check.

python few_shot_labels.py          -> local scripted result, zero API calls
python few_shot_labels.py --live   -> one real API request

The offline helper uses keyword rules, not model inference. Keep the bundle
files together. Actual live output can differ from the scripted output.
"""

from session05_runtime import prepare, request

client, model = prepare("Few-shot labels: --live makes one real API request.")

# Application instructions define the task and allowed output.
rules = (
    "Classify a campus lab question. Return exactly one label: "
    "BOOKING for reserving slots; HOURS for opening times; "
    "SAFETY for training requirements; UNKNOWN for other requests. "
    "Return only the label, without extra text."
)

# Square brackets form a list. Each dictionary has named role/content fields.
# User/assistant pairs show inputs and the desired outputs.
messages = [
    {"role": "user", "content": "Please reserve Lab 2."},
    {"role": "assistant", "content": "BOOKING"},
    {"role": "user", "content": "When does the lab open?"},
    {"role": "assistant", "content": "HOURS"},
    {"role": "user", "content": "Is safety training required?"},
    {"role": "assistant", "content": "SAFETY"},
]

# The new input differs from the example inputs.
question = "At what time does Lab 2 close?"
messages.append({"role": "user", "content": question})

response = request(client, model, instructions=rules, input=messages, store=False)

# strip removes surrounding whitespace. It does not verify the meaning.
label = response.output_text.strip()
allowed = {"BOOKING", "HOURS", "SAFETY", "UNKNOWN"}
if label not in allowed:
    raise SystemExit("Output failed the allowed-label check. Inspect the response.")
print("Returned label:", label)

# For this fixed hours test, the expected label is HOURS.
print("Matches this question's expected label:", label == "HOURS")

# Try other held-out questions. Record the expected label before running.
# A correct format is separate from a correct classification.
