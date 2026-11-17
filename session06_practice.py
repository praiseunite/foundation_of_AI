"""Session 6: original offline revision exercises, not official textbook answers.

Run with Python 3: python session06_practice.py
No packages, account, key, or internet are required.
Predict the results first, run, then change one value and explain the difference.
"""

# A variable is a name for a stored value. = assigns; it is not an equality test.
x1 = 0.8
w1 = 1.2
x2 = 0.4
w2 = 0.6
bias = -0.5

# * multiplies. Multiplication happens before addition in this expression.
# Each input contributes through its own weight; the bias adds an offset.
score = x1 * w1 + x2 * w2 + bias

# max is a function. The comma separates its two arguments.
# ReLU chooses the larger of zero and the score. This is one toy unit.
output = max(0, score)
print("Toy neuron: score =", round(score, 2), "ReLU output =", round(output, 2))

# CHALLENGE 1: set x1 and x2 to 0. Change only bias. Predict the output.
# CHALLENGE 2: make the score negative. Explain why ReLU returns zero.
# These manually set weights do not train a network.


# The following functions are optional reusable versions of familiar arithmetic.
# def defines a function; indented lines belong to that function.
# Parameters receive the caller's values, so different cases can reuse the code.
def metrics(tp, fp, fn, tn):
    """Return decimal ratios; None means the ratio has a zero denominator."""
    # A tuple groups the four values. for checks each count in turn.
    # type(...) is int excludes True/False, which Python also treats as numbers.
    for count in (tp, fp, fn, tn):
        if type(count) is not int or count < 0:
            raise ValueError("Every count must be a whole, nonnegative integer.")

    total = tp + fp + fn + tn
    flagged = tp + fp        # All messages the filter predicted as spam.
    actual_spam = tp + fn    # All messages that really were spam.
    f1_denominator = 2 * tp + fp + fn

    # The conditional expression computes a ratio only with a nonzero divisor.
    accuracy = (tp + tn) / total if total > 0 else None
    precision = tp / flagged if flagged > 0 else None
    recall = tp / actual_spam if actual_spam > 0 else None
    f1 = 2 * tp / f1_denominator if f1_denominator > 0 else None

    # A dictionary connects each metric name with its computed value.
    return {"accuracy": accuracy, "precision": precision, "recall": recall, "f1": f1}


def show_metrics(title, counts):
    print("\n" + title)
    # *counts unpacks the four tuple entries into the four function parameters.
    results = metrics(*counts)
    # .items() supplies each dictionary key and value in turn.
    for name, value in results.items():
        if value is None:
            print(name + ": undefined (zero denominator)")
        else:
            # Multiplying a decimal ratio by 100 gives a percentage.
            # :.1f displays one digit after the decimal point.
            print(f"{name}: {value * 100:.1f}%")


# The order is TP, FP, FN, TN. Spam is our positive class.
show_metrics("8-message practice: TP2 FP2 FN1 TN3", (2, 2, 1, 3))
show_metrics("Always normal: TP0 FP0 FN5 TN95", (0, 0, 5, 95))
show_metrics("No examples", (0, 0, 0, 0))

# CHALLENGE 3: explain 95% accuracy alongside 0% recall in the second case.
# CHALLENGE 4: replace one missed spam (FN) with a caught spam (TP).
# Predict which denominators stay the same and which metric values change.


# Quotes create a string literal. An unquoted variable retrieves its value.
prompt = "Explain a variable in one sentence."
print("\nLiteral string:", "prompt")
print("Value in the variable:", prompt)

# A list keeps an ordered collection. Each message is a dictionary.
history = [
    {"role": "user", "content": "My name is Amina."},
    {"role": "assistant", "content": "Thanks."},
    {"role": "user", "content": "Greet me by name."},
]

# -1 is the last index. A slice [-1:] returns a list containing the last item.
print("Only the last message:", history[-1:])
print("All messages:", history)
# CHALLENGE 5: explain which selection contains the name.
# This prints Python values. It does not call a model or execute an API request.
