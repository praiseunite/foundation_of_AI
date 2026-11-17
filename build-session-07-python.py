"""Package the self-contained workshop code and one fitted example model."""
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from session07_train import make_data, fit, metrics

root = Path(__file__).parent
training, validation, test = make_data("straight")
model = fit(training)
artifact = {
    "format": "aptech-linear-regression-v1",
    "formula": "prediction = slope * hours + bias",
    "inputUnits": "hours", "outputUnits": "fictional credits",
    "slope": model["slope"], "bias": model["bias"], "scenario": "straight",
    "steps": 500, "learningRate": 0.03, "frozen": True, "testSeen": True,
    "evaluation": {name: metrics(rows, model["slope"], model["bias"])
                   for name, rows in [("train", training), ("validation", validation), ("test", test)]},
}
(root / "session-07-example-model.json").write_text(json.dumps(artifact, indent=2), encoding="utf-8")
with ZipFile(root / "session-07-python.zip", "w", ZIP_DEFLATED) as bundle:
    for name in ["session07_train.py", "session07_predict.py", "session-07-python-guide.txt", "session-07-example-model.json"]:
        bundle.write(root / name, name)
print("Built offline Python bundle with a trained example model.")
