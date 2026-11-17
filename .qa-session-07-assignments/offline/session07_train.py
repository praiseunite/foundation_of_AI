"""Session 7: train one small regression model, entirely offline.

Original supplementary workshop; every example is fictional.
Run: python session07_train.py
Try: python session07_train.py --scenario shift
Try: python session07_train.py --rate 0.001 --steps 500
Save parameters: python session07_train.py --output my_model.json
"""

# Imports make standard-library functions available. No package install is needed.
import argparse
import json
import math
from pathlib import Path


def make_data(scenario):
    """Keep examples in three distinct lists of (input, observed target) pairs."""
    # The nested helper is specific to this fictional demonstration.
    def target(hours):
        if scenario == "curve":
            return hours * hours + 1
        return 2 * hours + 1

    # [] creates a list. A comprehension constructs one pair for each input.
    training = [(hours, target(hours)) for hours in (1, 2, 3, 4)]
    validation = [(hours, target(hours)) for hours in (5, 6)]
    test = []
    for hours in (7, 8):
        # A deliberate change in the test relationship illustrates distribution shift.
        actual = 3 * hours + 1 if scenario == "shift" else target(hours)
        test.append((hours, actual))
    return training, validation, test


def predict(hours, slope, bias):
    # def names a reusable function. Its indented body computes and returns a value.
    # * multiplies before + adds. The slope's units are credits per hour.
    return slope * hours + bias


def metrics(examples, slope, bias):
    # Start accumulators at zero, then add one example's difference at a time.
    total_absolute = 0.0
    total_squared = 0.0
    for hours, actual in examples:
        # Unpacking assigns the pair's first item to hours and the second to actual.
        error = predict(hours, slope, bias) - actual
        total_absolute += abs(error)   # += adds to the stored accumulator.
        total_squared += error * error
    count = len(examples)
    if count == 0:
        return {"mae": None, "mse": None}
    # A dictionary maps metric names to values. / divides by the example count.
    return {"mae": total_absolute / count, "mse": total_squared / count}


def fit(training, learning_rate=0.03, steps=500):
    """Fit only the supplied training examples, starting at slope 0, bias 0.

    Gradient formulas below are optional mathematics. Trace the sequence first:
    predict -> compare -> accumulate both gradients -> update both parameters.
    """
    if not training:
        raise ValueError("Training examples must not be empty.")
    if not math.isfinite(learning_rate) or learning_rate <= 0:
        raise ValueError("Learning rate must be finite and positive.")
    if type(steps) is not int or steps < 0:
        raise ValueError("Steps must be a whole, nonnegative integer.")
    slope = 0.0
    bias = 0.0
    completed = 0

    # range(steps) repeats the body that many times. The index is not a data row.
    for step in range(steps):
        dw = 0.0
        db = 0.0
        # Both gradients use the SAME old model. This loop never reads test rows.
        for hours, actual in training:
            error = predict(hours, slope, bias) - actual
            # MSE gradient: average 2*error*x for slope, 2*error for bias.
            # A gradient describes the local sensitivity of the chosen loss.
            dw += 2 * error * hours / len(training)
            db += 2 * error / len(training)

        # Subtract a scaled gradient. Simultaneous updates use the accumulated values.
        next_slope = slope - learning_rate * dw
        next_bias = bias - learning_rate * db
        proposed_loss = metrics(training, next_slope, next_bias)["mse"]
        # A huge rate may overshoot. Stop before accepting a numerically unsafe step.
        if not math.isfinite(proposed_loss) or proposed_loss > 1e12:
            return {"slope": slope, "bias": bias, "steps": completed, "stopped": True}
        slope = next_slope
        bias = next_bias
        completed += 1
    return {"slope": slope, "bias": bias, "steps": completed, "stopped": False}


def main():
    # argparse reads optional terminal settings. choices limits allowed scenarios.
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--scenario", choices=["straight", "shift", "curve"], default="straight")
    parser.add_argument("--rate", type=float, default=0.03)
    parser.add_argument("--steps", type=int, default=500)
    parser.add_argument("--output", help="Optional filename for saved model JSON")
    settings = parser.parse_args()
    training, validation, test = make_data(settings.scenario)
    try:
        model = fit(training, settings.rate, settings.steps)
    except ValueError as error:
        parser.error(str(error))

    print("Fictional scenario:", settings.scenario)
    print(f"Updates: {model['steps']}; slope: {model['slope']:.6f}; bias: {model['bias']:.6f}")
    if model["stopped"]:
        print("Stopped: proposed loss became too large. Reset with a smaller rate.")
        return

    # This is a demonstration configuration. Compare settings on validation first
    # when making your own choice. Final reports below do not alter the model.
    evaluation = {}
    for name, examples in [("train", training), ("validation", validation), ("test", test)]:
        result = metrics(examples, model["slope"], model["bias"])
        evaluation[name] = result
        print(f"{name}: MAE {result['mae']:.6f} credits; MSE {result['mse']:.6f} squared credits")

    # Fit the constant baseline using TRAINING targets, never the test targets.
    baseline = sum(actual for hours, actual in training) / len(training)
    baseline_score = metrics(test, 0.0, baseline)
    print(f"Training-mean baseline: {baseline:.2f}; test MAE {baseline_score['mae']:.6f} credits")
    print("Test predictions:")
    for hours, actual in test:
        print(f"  {hours} hours: predicted {predict(hours, model['slope'], model['bias']):.6f}, actual {actual}")
    print("Tiny synthetic data illustrates mechanisms, not real deployment quality.")
    print("If these test answers inform another choice, use fresh data for an independent evaluation.")

    if settings.output:
        artifact = {
            "format": "aptech-linear-regression-v1",
            "formula": "prediction = slope * hours + bias",
            "inputUnits": "hours", "outputUnits": "fictional credits",
            "slope": model["slope"], "bias": model["bias"],
            "scenario": settings.scenario, "steps": model["steps"],
            "learningRate": settings.rate, "frozen": True, "evaluation": evaluation,
            "testSeen": True,
        }
        # JSON records values; it is data, not executable Python code.
        Path(settings.output).write_text(json.dumps(artifact, indent=2), encoding="utf-8")
        print("Saved model:", settings.output)


# Execute examples when run directly. Importing the file only defines its functions.
if __name__ == "__main__":
    main()
