# Foundations of AI

Student lessons, interactive practice, Python examples, and assignments for the Aptech Foundations of AI course.

## Start the course

Download this repository using **Code → Download ZIP**, extract it, and open [session-01.html](session-01.html) in a browser. Use the previous/next session links to move through the course. Lessons and browser labs work offline.

| Session | Topic |
| --- | --- |
| [1](session-01.html) | AI and machine learning |
| [2](session-02.html) | Deep learning and neural networks |
| [3](session-03.html) | Problem solving, agents, and search |
| [4](session-04.html) | Knowledge, reasoning, and performance metrics |
| [5](session-05.html) | Python requests, prompting, and conversation context |
| [6](session-06.html) | Course practice and consolidation |
| [7](session-07.html) | Extra workshop: train and evaluate a small model |

## Student assignments and downloads

- Open [Session 7 assignments](session-07-assignments.html) for the interactive tasks.
- Download and extract the [Session 7 student bundle](session-07-student-bundle.zip) for the workshop, assignments, Python files, and setup guide.
- Sessions [5](session-05-python.zip), [6](session-06-python.zip), and [7](session-07-python.zip) have Python download packs with included instructions.
- Python examples require Python 3. Session 5 defaults to scripted offline responses; its guide explains optional live API use and environment-based credentials.

Browser work is saved locally where storage is available. Use the lesson and assignment export buttons to keep your work or submit it through the channel specified in class.

The six core sessions are supplemented by an extra Session 7 workshop. Activities use fictional examples and are original supplementary practice. Complete any official textbook questions and assignments supplied in class separately.

## Editing the lessons

Session 1 is self-contained. Sessions 2–7 use their `.source.js` and `.styles.css` files. With Node.js installed, run the `build-session-02.cjs` through `build-session-07.cjs` scripts in order, followed by `build-session-07-assignments.cjs`, to rebuild the HTML pages. Run `python build-session-07-student-bundle.py` after changing the workshop or assignment pages to refresh the student download.

Private teaching material, preparation prompts, internal QA output, local environments, and credentials are excluded by `.gitignore`.
