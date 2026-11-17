"""Create a student-only ZIP; worked teacher answers are deliberately separate."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).parent
files = [
    "session-07-assignments.html", "session-07.html",
    "session07_train.py", "session07_predict.py", "session07_tasks_starter.py",
    "session-07-example-model.json", "session-07-python-guide.txt",
    "session-07-student-readme.txt", "session-07-python.zip",
]
with ZipFile(root / "session-07-student-bundle.zip", "w", ZIP_DEFLATED) as bundle:
    for name in files:
        if name == "session-07-assignments.html":
            html = (root / name).read_text(encoding="utf-8")
            html = html.replace('href="session-07-student-bundle.zip" download', 'href="session-07-student-readme.txt"')
            html = html.replace('>Student bundle</a>', '>Offline setup guide</a>')
            html = html.replace('>Download student bundle</a>', '>Read the included setup guide</a>')
            bundle.writestr(name, html)
        elif name == "session-07.html":
            import re
            html = (root / name).read_text(encoding="utf-8")
            nav = '<nav class="course-nav" aria-label="Student bundle navigation"><a class="session-link" href="session-07-assignments.html">← Assignments</a><div class="course-position"><b>Session 7 · extra workshop</b><span>Train your first model</span></div><span class="session-link next-session" aria-disabled="true">End of workshop</span></nav>'
            html = re.sub(r'<!-- course-session-navigation:start -->[\s\S]*?<!-- course-session-navigation:end -->', nav, html)
            html = html.replace('href="session-01.html">Session 1: the ML workflow', 'href="session-07-python-guide.txt">Review the included Python and split guide')
            bundle.writestr(name, html)
        else:
            bundle.write(root / name, name)
print("Built student bundle: interactive pack, lesson, Python examples, and starter.")
