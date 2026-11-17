"""Session 5: explicitly send a small text conversation.

python conversation_context.py          -> scripted context, zero API calls
python conversation_context.py --live   -> two real API requests

Keep session05_runtime.py beside this file. This simple text-only history is
not a general tool/agent history manager.
"""

from session05_runtime import prepare, request

client, model = prepare("Conversation context: --live makes two real API requests.")
rules = "Use simple words. Use only a name supplied in this conversation; ask if it is missing."

# The application starts and owns the ordered text-message list.
history = [{"role": "user", "content": "My name is Amina."}]
first = request(client, model, instructions=rules, input=history, store=False)
print("First answer:", first.output_text)

# Save the assistant's text as a message, then add the new user question.
history.append({"role": "assistant", "content": first.output_text})
history.append({"role": "user", "content": "Greet me by name."})

# Explicitly provide the earlier turns again. Instructions apply to this call.
second = request(client, model, instructions=rules, input=history, store=False)
print("Follow-up answer:", second.output_text)

# Exercise: replace input=history above with input=history[-1:] to send only
# the last message. The offline helper then asks for a name.
# [-1:] is a slice: a list containing the last item.
# In live mode, inspect whether the model asks rather than guessing.
