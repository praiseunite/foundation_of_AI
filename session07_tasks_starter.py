"""Optional Session 7 assignment starter. Original fictional practice.

Run: python session07_tasks_starter.py
Core browser tasks do not require this file or a Python installation.
"""

# These helpers live in session07_train.py in the SAME extracted folder.
# An import makes their function definitions available without running main there.
from session07_train import fit, metrics


def predict(hours, slope, bias):
    # TODO 1: replace None with the multiplication-and-addition calculation.
    # hours is the input; slope and bias are model parameters.
    # return sends the computed number back to the caller.
    return None


def main():
    result = predict(3, 2, 1)
    if result is None:
        print("Complete predict() first: multiply the input by its slope, then add bias.")
        return
    print("Starter prediction at 3 hours:", result)
    print("Explain your formula before continuing to the optional training challenge.")

    # TODO 2, optional: change False to True when you are ready for new-data training.
    run_training_challenge = False
    if not run_training_challenge:
        return

    # Synthetic numeric pairs: (hours, observed cost). They follow a new relationship.
    training = [(1, 5), (2, 8), (3, 11), (4, 14)]
    validation = [(5, 17), (6, 20)]
    test = [(7, 23), (8, 26)]

    # TODO 3: compare candidate settings using validation, then record your choice.
    # This starter setting illustrates the procedure; it is not an automatic selector.
    chosen_rate = 0.03
    updates = 500
    model = fit(training, chosen_rate, updates)
    if model["stopped"]:
        print("Training stopped; reset with a suitable smaller rate.")
        return
    print("Learned parameters:", model)
    print("Validation metrics:", metrics(validation, model["slope"], model["bias"]))

    # TODO 4: record your reason BEFORE enabling the next evaluation line.
    reveal_test = False
    if reveal_test:
        print("Test metrics:", metrics(test, model["slope"], model["bias"]))
        print("If this result informs another model choice, use fresh data for a new independent claim.")
    else:
        print("Test report kept aside. Explain the validation choice before setting reveal_test=True.")


if __name__ == "__main__":
    main()
