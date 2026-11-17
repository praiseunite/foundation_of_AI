"""Session 4: a small decision using explicit, verified Boolean facts.

Run: python knowledge_rules.py
Change one input, predict the output, and explain which condition changes.
This is a fictional policy, not a trained machine-learning model.
"""

# A variable is a name for a stored value. = assigns that value.
# True and False are Boolean literals. They use capital letters in Python.
enrolled = True
completed_safety = False
suspended = False

# and requires the Boolean conditions to hold together.
# not reverses the Boolean suspension value.
# The expression is evaluated here, and its result is stored in may_enter.
may_enter = enrolled and completed_safety and not suspended

# Parentheses enclose the argument to the print function.
# No quotation marks means print the variable's value, not its name.
print(may_enter)

# A colon starts the block. Four spaces put its instructions inside it.
if may_enter:
    # Quotation marks create a text string. This branch runs if True.
    print("Lab access granted")
else:
    # else aligns with if. Its indented branch runs if the condition is False.
    print("Check requirements")

# Important modelling assumption: every input above is a verified Boolean.
# An unknown record needs explicit handling. Do not silently call it False.
# Stretch exercise: ask for missing evidence before evaluating the policy.
