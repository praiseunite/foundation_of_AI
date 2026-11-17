"""Use saved parameters without training again. No packages or internet.

Run: python session07_predict.py --hours 3
Or:  python session07_predict.py session-07-model.json --hours 4
The second command accepts a model exported from the HTML presentation.
"""

import argparse
import json
import math
from pathlib import Path


def load_model(filename):
    model = json.loads(Path(filename).read_text(encoding="utf-8"))
    if not isinstance(model, dict) or model.get("format") != "aptech-linear-regression-v1":
        raise ValueError("Choose a Session 7 linear-model JSON file.")
    for key in ("slope", "bias"):
        value = model.get(key)
        if type(value) not in (int, float) or not math.isfinite(value):
            raise ValueError("Slope and bias must be finite numbers.")
    return model


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    default_model = Path(__file__).with_name("session-07-example-model.json")
    parser.add_argument("model", nargs="?", default=str(default_model))
    parser.add_argument("--hours", type=float, default=3.0)
    settings = parser.parse_args()
    if not math.isfinite(settings.hours) or settings.hours < 0:
        parser.error("Hours must be a finite, nonnegative number.")
    try:
        model = load_model(settings.model)
    except (OSError, ValueError) as error:
        parser.error(str(error))

    # Reusing the parameters is inference. No gradient or training loop runs here.
    prediction = model["slope"] * settings.hours + model["bias"]
    if not math.isfinite(prediction):
        parser.error("Prediction exceeded the numerical range.")
    print(f"{settings.hours:g} hours -> {prediction:.6f} fictional credits")
    print("Computed from saved slope and bias; no new training occurred.")
    print("A synthetic model estimate is not an official campus price.")


if __name__ == "__main__":
    main()
