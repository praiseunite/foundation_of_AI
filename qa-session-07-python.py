"""Independent numeric checks and browser/Python comparison fixtures."""
import itertools
import json
import math
import subprocess
import sys
from pathlib import Path
from zipfile import ZipFile
import session07_train as t
from session07_predict import load_model

root = Path(__file__).parent
out = root / '.qa-session-07'
out.mkdir(exist_ok=True)
expected = {}
for scenario in ['straight', 'shift', 'curve']:
    training, validation, test = t.make_data(scenario)
    for rate, steps in [(0.03, 1), (0.03, 500), (0.001, 500), (0.5, 50)]:
        model = t.fit(training, rate, steps)
        expected[f'{scenario}:{rate}:{steps}'] = {
            **model,
            'train': t.metrics(training, model['slope'], model['bias']),
            'validation': t.metrics(validation, model['slope'], model['bias']),
            'test': t.metrics(test, model['slope'], model['bias']),
        }
        if rate == 0.5:
            assert model['stopped'] and model['steps'] < 50
        else:
            assert not model['stopped'] and model['steps'] == steps

one = expected['straight:0.03:1']
assert math.isclose(one['slope'], 1.05)
assert math.isclose(one['bias'], 0.36)
assert math.isclose(one['train']['mse'], 10.21835)
trained = expected['straight:0.03:500']
assert abs(trained['slope'] - 2) < 0.002
assert abs(trained['bias'] - 1) < 0.004
assert trained['test']['mae'] < 0.005
assert 7.49 < expected['shift:0.03:500']['test']['mae'] < 7.51
assert 1 < expected['curve:0.03:500']['train']['mse'] < 1.01
assert expected['curve:0.03:500']['test']['mae'] > 24
assert t.metrics([], 0, 0) == {'mae': None, 'mse': None}
for rate, steps in [(0, 1), (-1, 1), (float('nan'), 1), (float('inf'), 1), (.03, -1), (.03, .5)]:
    try:
        t.fit([(1, 3)], rate, steps)
    except ValueError:
        pass
    else:
        raise AssertionError('Accepted invalid training setting')
try:
    t.fit([])
except ValueError:
    pass
else:
    raise AssertionError('Accepted empty training rows')

artifact = load_model(root / 'session-07-example-model.json')
assert math.isclose(artifact['slope'], trained['slope'])
for invalid in [[], {}, {'format':'wrong'}, {'format':'aptech-linear-regression-v1','slope':True,'bias':0}]:
    filename = out / 'invalid-model.json'
    filename.write_text(json.dumps(invalid), encoding='utf-8')
    try:
        load_model(filename)
    except ValueError:
        pass
    else:
        raise AssertionError('Accepted invalid model JSON')
with ZipFile(root / 'session-07-python.zip') as z:
    assert z.testzip() is None and len(z.namelist()) == 4

# Test saved-parameter inference through the actual CLI.
run = subprocess.run([sys.executable, str(root/'session07_predict.py'), '--hours', '3'], capture_output=True, text=True)
assert run.returncode == 0 and '7.000064' in run.stdout
bad = subprocess.run([sys.executable, str(root/'session07_predict.py'), '--hours', '-1'], capture_output=True, text=True)
assert bad.returncode != 0 and 'nonnegative' in bad.stderr
(out / 'python-results.json').write_text(json.dumps(expected, indent=2), encoding='utf-8')
print('Python passed: 12 training cases, convergence, shift/curve limits, invalid settings/model files, saved-model CLI, ZIP integrity.')
