"""Session 4: calculate the metrics shown by the browser lab at threshold 0.50.

Run: python performance_metrics.py
The counts describe 12 fictional labelled messages. Spam is the positive class.
"""

# Count actual labels compared with predicted labels.
true_positive = 3   # Spam correctly flagged.
false_positive = 2  # Normal messages wrongly flagged.
false_negative = 1  # Spam messages missed.
true_negative = 6   # Normal messages correctly kept.

# + adds numbers. / divides. Parentheses group a calculation.
total = true_positive + false_positive + false_negative + true_negative
accuracy = (true_positive + true_negative) / total

# Protect ratios from division by zero. None marks an undefined ratio here.
flagged = true_positive + false_positive
if flagged > 0:
    precision = true_positive / flagged
else:
    precision = None

actual_spam = true_positive + false_negative
if actual_spam > 0:
    recall = true_positive / actual_spam
else:
    recall = None

# * multiplies. F1's count formula avoids multiplying undefined ratios.
f1_denominator = 2 * true_positive + false_positive + false_negative
if f1_denominator > 0:
    f1 = 2 * true_positive / f1_denominator
else:
    f1 = None

# Decimal fractions: 0.75 means 75%. Print each label with its value.
print("Accuracy:", accuracy)
print("Precision:", precision)
print("Recall:", recall)
print("F1:", f1)

# Try the 0.80 threshold counts: TP=2, FP=0, FN=2, TN=8.
# Always-normal counts: TP=0, FP=0, FN=4, TN=8.
# Precision then becomes None, while recall and F1 become 0.0.
# This optional full-Python file adds numeric arithmetic and comparisons.
# The browser's Boolean teaching interpreter does not run this file.
