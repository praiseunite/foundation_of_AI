# Foundations of AI: practical teaching blueprint and reusable prompt

Prepared for absolute beginners from the supplied Aptech Foundations of AI Presenter’s Manual, effective April 2026, version 1.0.

## What the source actually provides

The attachment is a presenter’s outline. It allocates six two-hour taught sessions (12 hours) and three two-hour self-study sessions (6 hours). It maps those classes to seven book sessions in AI Essentials Unveiled.

The book chapters, Try It Yourself questions, and ProConnect assignment questions were not supplied. The activities below are original supplementary activities. Their exact correspondence to unseen questions must be checked when those questions become available.

The manual sometimes uses inconsistent TL labels. This plan follows the numbered classes and their stated coverage.

## The teaching principle

Every topic should answer: What problem are we solving? Why does this method help? How does it work? What can go wrong? Can I use it in another situation?

Use this sequence:

1. EXPERIENCE: attempt a familiar problem with cards, a map, or a small table.
2. EXPLAIN: identify the difficulty; introduce the idea and define its vocabulary.
3. DEMONSTRATE: solve one small example and explain the decisions.
4. TRACE: predict the result and follow the data or program step by step.
5. CHANGE: modify one input, rule, weight, example, or prompt.
6. TRANSFER: solve a related problem without copying the demonstration.
7. EXPLAIN BACK: describe why the method worked and where it failed.

For example, training/test separation becomes meaningful when students discover that memorising the practice cards does not prove they can classify new cards.

Deep understanding needs observable evidence. A student should be able to explain, predict, modify, test, and apply an idea. Running copied code establishes only one of those abilities.

## Scope and realistic expectations

Within 12 taught hours plus 6 self-study hours, aim for practical introductory understanding and supported implementation. Independent mastery of every listed algorithm and Python programming would need more practice.

Cover each required topic, but distinguish:
- Explain or recognise: broad types, applications, and algorithm families.
- Work through: a tiny neural calculation, a search trace, and a confusion matrix.
- Implement with support: simple Python rules and an API request.
- Apply independently: a small variation using previously taught concepts.

If additional time is available, add two optional two-hour Python bridge classes before the module. These are additional hours, not part of the manual’s allocation. Teach running a program, variables, strings, numbers, booleans, conditions, collections, loops, and reading errors through tiny examples. The core plan below still introduces the necessary subset inside the existing classes.

## A reusable two-hour lesson rhythm

This is a starting template; combined-topic classes need their own allocation.

| Minutes | Activity | Evidence |
|---|---|---|
| 0–10 | Retrieval question and familiar challenge | Individual prediction |
| 10–30 | Short explanations interleaved with questions | Student explanation in everyday language |
| 30–45 | Paper or physical simulation | Completed trace or diagram |
| 45–70 | Teacher demonstration and guided practical | Working example with notes |
| 70–85 | Predict, change, rerun, investigate | Before/after result with reason |
| 85–105 | Pair or individual transfer task | Original solution to a small variation |
| 105–115 | Compare solutions and discuss limitations | One discovered failure |
| 115–120 | Exit ticket | One explanation and one application |

Break the explanation into short segments. Use a different participation mode roughly every 10–15 minutes. Pair roles can rotate between operator and explainer. Paper work is a practical activity when students are making decisions and inspecting results.

## Map to the six official classes

| Official class | Book coverage | Practical activity | Programming progression | Evidence of understanding |
|---|---|---|---|---|
| 1 | Book 1: AI and machine learning | Sort example messages; compare a fixed rule with decisions drawn from labelled examples; reserve unseen cards | Run a tiny program; strings, numbers, variables, output | Identify inputs, labels, training examples, test examples, and failures |
| 2 | Book 2: deep learning | Students simulate a neural network; calculate a weighted sum; change a weight; inspect a stock-prediction case | Arithmetic, assignment, booleans; trace a short calculation | Explain weights, layers, prediction, and the difference between chosen and learned weights |
| 3 | Books 3–4: problem solving, agents, search | Route a campus delivery on a map; compare breadth-first search and a heuristic-guided strategy | Introduce lists and a simple repeated operation only when used | Specify start, goal, actions, constraints, costs, and why a search decision was made |
| 4 | Books 5–6: knowledge representation, logic, metrics, trends | Build a campus facts-and-rules system; evaluate a small classifier with a confusion matrix | Dictionaries, lookup, comparisons, if/else, indentation | Explain a rule, trace an inference, and calculate a metric |
| 5 | Book 7: OpenAI coding in Python | Build a small study helper; improve prompts; compare examples; test a follow-up with and without context | Imports, function calls, keyword arguments, request/response, response access | Explain each API-program line and demonstrate the effect of context |
| 6 | Book 1–7 Try It Yourself | Work through the supplied book questions; demonstrate a small project; explain one change and one failed test | Reuse concepts already practised | Show a working result and defend its design in plain language |

### Class 1: why learning from examples is useful

Begin with fictional messages such as “Can I borrow your notes?” and “Win a free phone now!” Students create a sorting rule. Give them a confusing counterexample.

Then use a small set of labelled examples to make classifications by similarity. This is a manual demonstration of learning from examples; it is not a claim that a trained software model has been built.

Teach AI’s meaning, purpose, scope, applications, effects, and system types. Explain the distinction between current specialised systems and hypothetical broader intelligence where relevant to the book. Define supervised, unsupervised, and semi-supervised learning explicitly because they appear in the module outcomes.

Walk through problem definition, data collection, preparation, training, evaluation, and use. Discuss whether machine learning is appropriate when a simple reliable rule already solves the problem.

First code can simply store one message and display it. Students must understand text, quotation marks, assignment, and output before using a classifier library.

Transfer task: design a fictional message dataset, state a labelling rule, reserve unseen examples, and identify an ambiguous message.

### Class 2: how a network combines evidence

Use cards representing inputs, weights, a bias, and an output. Compute a weighted sum with small integers. A student acting as an output unit applies a clearly stated activation rule. Describe how layers transform information.

Manually changing a weight demonstrates sensitivity. Training requires a procedure that adjusts parameters from examples using an objective or error; do not describe arbitrary weight changes as a trained deep-learning model.

Compare conventional machine learning and deep learning in terms of representation, data, computation, and use. Explain neural networks as mathematical systems; brain analogies are limited.

Survey the algorithm families actually named in the book. Until that list is supplied, any examples such as convolutional or recurrent networks are supplementary examples rather than confirmed textbook coverage.

Retain the required stock-price case study as an evaluation exercise: use a small historical or clearly synthetic series, train on earlier observations, test on later ones, and compare against predicting the previous price. Discuss changing conditions, uncertainty, and future-data leakage. Prediction accuracy is not evidence of guaranteed profit.

Transfer task: calculate a new input’s output, explain the effect of changing one weight, and choose an appropriate application.

### Class 3: represent the problem before searching

Use a fictional campus map with labelled nodes and edges. Students must state the initial state, goal, possible actions, constraints, and path cost before finding a route.

Introduce agents through sensors or observations, actions, goals, and environment. Compare agent types at the depth required by the book.

Run breadth-first search on a graph where each edge has the same cost. Contrast it with an informed strategy that uses an estimate of distance to the goal. Explain that a helpful estimate is not proof of an optimal result.

If comparing shortest routes on differently weighted edges, use a suitable cost-aware method rather than claiming breadth-first search finds the cheapest route.

Core learner work is a search trace and comparison. Complete search code is a guided demonstration or an extension if loops and collections are still unfamiliar.

Transfer task: close one route, update the problem, and justify a new search trace.

### Class 4: represent knowledge and check decisions

Represent campus facts in a small table or dictionary. Add a fictional rule such as “The study room is available only when it is open and space remains.” Identify facts, rules, conditions, conclusions, missing information, and conflicting information.

Explain knowledge representation types and approaches, knowledge acquisition and updating, planning, and decision-making. Include propositional statements, a simple predicate example, and distinctions among deduction, induction, and abduction.

For metrics, use ten labelled fictional cases with three positive cases. An “always negative” classifier scores seven correct out of ten but misses every positive. Students can see why accuracy alone can mislead.

Count true positives, false positives, true negatives, and false negatives. Explain precision and recall using counts before formulas. Introduce F1 at the depth required by the book and handle zero denominators. For numerical predictions, introduce a suitable error metric such as mean absolute error if included in the book.

Include a brief generative-AI example and discuss how to verify an output. Keep this within the combined class’s time allocation.

Transfer task: change a rule, test three cases, and choose a metric based on which mistakes matter.

### Class 5: understand every part of an API program

Before the API call, explain the Python concepts it uses: imports, the library, calls, arguments, variables, objects, and response access. Explain an API as a defined way for one program to request a service from another.

Compare vague and specific prompts for the same task. Add two or three examples to demonstrate few-shot prompting. Test a follow-up question with and without the necessary previous context.

Preserve the manual’s comparison of gpt-3.5-turbo and gpt-4-turbo-preview as historical syllabus content. OpenAI’s current catalog lists both as shut down. Use currently documented models available to the teaching account for live requests, explicitly identifying the update.

Official documentation checked on 8 November 2026:
- [Model catalog](https://developers.openai.com/api/docs/models/all): current model status.
- [Deprecations](https://developers.openai.com/api/docs/deprecations): shutdown information.
- [Developer quickstart](https://developers.openai.com/api/docs/quickstart): Python SDK and Responses API examples.

Use a teacher-managed setup where needed, keep keys out of student source files and shared notebooks, and explain that API usage requires authorised access and may incur costs. Test the lab before class.

If access or connectivity is unavailable, provide a clearly labelled simulation with prepared responses. It can teach program flow and prompting experiments, but it does not satisfy the live API implementation outcome. Complete a real teacher-supervised request when access is available.

Transfer task: make a study helper explain a supplied beginner concept, add one useful example to its prompt, and evaluate several outputs. Sending a prompt uses an existing model; it does not train that model.

### Class 6: demonstrate and explain

Use the actual book’s Try It Yourself questions when supplied. The supplementary project below must fit around these required questions; it is not a substitute for them.

Suggested small project: a campus study helper with a few supplied fictional facts, a simple rule-based fallback, and an optional live API component where access exists.

Students submit:
- A diagram showing inputs, processing, and outputs.
- A small program or completed practical appropriate to the taught level.
- A short explanation of important lines and design choices.
- Three tests, including an unusual or failing input.
- One limitation and one improvement.

Do not force a beginner to combine a trained neural network, search engine, knowledge system, and chatbot into one application. Assess the broader syllabus using short questions and earlier practical evidence.

Use a brief individual explanation even when the project is completed in pairs.

## Allocate the six self-study hours

Spread these between classes when scheduling permits; the total remains three two-hour blocks.

| Block | Allocation | Output |
|---|---|---|
| S1 | 30 min Python retrieval; 45 min data/labels task; 30 min neural calculation; 15 min reflection | Tiny program, dataset worksheet, calculation |
| S2 | 40 min search trace; 40 min rules and metrics; 25 min relevant ProConnect questions; 15 min reflection | Map, rules, confusion matrix |
| S3 | 45 min relevant ProConnect questions; 45 min project completion; 20 min testing; 10 min rehearsal | Project, tests, explanation |

The full assignment set is unseen. Check its actual workload before promising every assignment can be completed in six hours. Replace overlapping supplementary tasks with official assignments where appropriate; flag extra time if the official work cannot fit.

Use the glossary for retrieval, Practice 4 Me for short checks, Work Assignments for evaluated practicals, and Ask to Learn for unresolved questions.

## A worked example: why syntax and logic matter

Use this after students have learned variables and booleans, during the rules lesson.

Problem: a fictional study room can be used when it is open and has space.

Before showing code, ask students to decide what should happen for all four combinations.

```python
room_open = True
space_available = False

if room_open and space_available:
    print("You can use the study room.")
else:
    print("Please try again later.")
```

Expected output:

```text
Please try again later.
```

| Code element | Meaning | Why it is used |
|---|---|---|
| room_open = True | Assign a boolean value to a name | Give the program a fact to inspect |
| space_available = False | Store another fact | Represent a condition independently |
| and | Both conditions must be true | Match the room’s stated rule |
| if | Select a branch using a condition | Make the output depend on the facts |
| : and indentation | Start and organise a block | Tell Python which statements belong to each branch |
| print(...) | Display text | Make the decision visible to the user |
| Quotation marks | Identify a string literal | Distinguish message text from program names |
| else | Select the alternative branch | Give a response when the condition fails |

Explain that assignment with = stores a value; comparison with == checks equality. The program uses hand-written rules. It illustrates programming and logical reasoning without learning from training examples.

Follow-up exercises:
1. Predict the output when space_available becomes True. Explain before running.
2. Replace and with or. Give a case where the new program violates the original room rule.
3. Add a third boolean, booking_confirmed, and require it too.
4. Write the four-row truth table for the original two conditions.
5. Explain why a running program can still implement the wrong rule.

Teacher answers:
1. The first message appears because both facts are true.
2. With room_open=False and space_available=True, or grants access to a closed room.
3. Use if room_open and space_available and booking_confirmed:, with the third variable defined first.
4. True/True allows access; True/False, False/True, and False/False do not.
5. Correct syntax makes a program executable; the condition must also match the intended decision.

## Suggested assessment

Follow any institutional grading requirements. For supplementary practicals, a useful allocation is:
- 40% explanation of ideas and design choices.
- 30% implementation or practical execution.
- 20% testing, interpretation, and debugging.
- 10% reflection on limitations and improvement.

An exit ticket should combine a why-question with a small transfer or prediction question. If students struggle, use another concrete example and a smaller guided exercise before advancing the dependent skill.

Reward clear explanations, good counterexamples, careful experiments, and collaboration. Avoid competitions based only on speed. Use humour and familiar situations naturally; preserve accuracy.

## Copy-and-paste master prompt

Paste the prompt below into the assistant, attach the presenter’s manual, and supply the relevant book chapter or assignment questions when available.

```text
Act as an experienced beginner AI teacher, Python tutor, and practical curriculum designer.

TASK
Turn the attached Aptech Foundations of AI material into engaging, accurate, practical lessons for students with no AI knowledge and no programming experience.

The central teaching principle is:
Students must understand the problem, why a method exists, how it works, what each program line contributes, how to test it, and where it can fail.

SOURCE AND SCHEDULE
Use the supplied material as the syllabus authority. Distinguish the six taught classes from the seven book sessions:
1. Book 1: AI and machine learning.
2. Book 2: deep learning.
3. Books 3–4: problem solving, agents, and search.
4. Books 5–6: knowledge representation, logic, performance metrics, and emerging trends.
5. Book 7: OpenAI coding in Python.
6. Try It Yourself from Books 1–7.
The allocation is six classes of 120 minutes plus three self-study blocks of 120 minutes: 18 hours total.

Map every supplied learning outcome and session bullet to instruction and a way to check understanding. Include module-level outcomes such as supervised, semi-supervised, and unsupervised learning.

If only the presenter’s manual is attached, state that it is an outline. Do not invent textbook quotations, page references, an exact list of algorithms, or original assignment questions. Label your own examples and exercises as supplementary. Preserve supplied official questions when they become available.

Keep the official order. Introduce essential Python prerequisites before using them. If mastery or the official assignment workload requires extra time, show the gap honestly and label any suggested bridge classes as additional hours.

LEARNER ASSUMPTIONS
Assume zero knowledge of variables, strings, booleans, collections, conditions, loops, functions, imports, APIs, and neural networks.
Assume only basic arithmetic. Explain the meaning of any additional mathematical notation before using it.
Use clear, respectful English and relatable examples such as school routines, messages, shops, football, transport, and campus navigation.
Do not assume reliable internet, personal API credit, or powerful computers. Include a paper or local alternative when useful.

TEACHING METHOD
For each major concept:
- Start with a familiar problem and ask students to attempt it.
- Show the difficulty that motivates the concept.
- Give an everyday explanation and then an accurate definition.
- Define new terms and explain the limits of any analogy.
- Demonstrate one small worked example.
- Ask students to predict a result before revealing it.
- Guide a practical.
- Let students change something and explain the effect.
- Give a related independent task.
- Check understanding with an explanation and a transfer question.

Keep teacher explanations brief and interleave them with student activity. Plan active participation roughly every 10–15 minutes.
Use paper simulations, role-play, debugging challenges, and pair work when they teach the target idea.
Reward reasoning and useful mistakes as well as correct answers.
Avoid assuming that copying code, reciting a definition, or asking an AI to produce an answer proves understanding.

CODE AND MATHEMATICS
Begin with tiny complete examples. Prefer Python’s standard library when it meets the goal.
Teach each prerequisite before it appears. Use readable names and introduce one major new programming idea at a time where feasible.
For each code example provide:
1. The problem and plain-language steps.
2. The prerequisite concepts.
3. The complete code and exactly where to run it.
4. Expected output; label variable AI output as illustrative.
5. A line-by-line explanation of what, why, and how.
6. Explanations of syntax such as quotes, brackets, colons, indentation, assignment, comparisons, calls, and keyword arguments when first used.
7. A trace showing how values change or how the branch is selected.
8. One modification with a prediction task.
9. One common error, its meaning, and how to investigate it.
10. A small independent variation.

Explain alternative choices and tradeoffs only when they help the beginner.
For formulas, start with a small table or counts, then calculate by hand, then show code if appropriate.
Do not claim code was executed unless it actually was.

ACCURACY
Distinguish AI, machine learning, deep learning, symbolic rules, search, and generative AI.
Distinguish programmer-written rules from parameters learned from examples.
Explain that an API request uses an existing model and that ordinary prompting is not training.
Teach training/test separation and why evaluation on unseen examples matters.
Explain the limits of neural-network brain analogies.
For stock prediction use time-ordered evaluation, an appropriate baseline, and uncertainty; do not imply reliable profit.
For search state the graph and cost assumptions; do not claim breadth-first search always finds the cheapest weighted route.
For metrics explain which errors matter and why accuracy may mislead.
For conversation context demonstrate how the chosen API supplies or links prior context; do not imply a model automatically remembers every previous request.

For OpenAI implementation, verify current SDK examples, model status, and API guidance against official OpenAI documentation before giving live-lab instructions. Cite the pages and check date. If verification is unavailable, label the guidance unverified.
Preserve the manual’s named models as historical comparison content if they are unavailable; explicitly identify the live-lab update.
Explain prerequisites, authorised access, possible usage charges, and keeping credentials out of shared source files.
Provide a clearly labelled simulation if access is missing, and state that completing the real API outcome still requires a live request.

ASSIGNMENTS AND FEEDBACK
For each lesson include:
- A guided task.
- A small independent core task.
- An optional stretch task.
- Clear deliverables and a realistic time estimate.
- Success criteria that check explanation, implementation, and testing.
- Hints that progress from a conceptual nudge to a partial solution.
- A separately labelled teacher answer key.
- Likely misconceptions and short reteaching activities.

Keep the required independent work within the six self-study hours. Optional extensions must be labelled.
Use the actual ProConnect and Try It Yourself questions when supplied. Identify overlapping supplementary work that can be replaced.
Include checks that expose whether a student can predict, modify, explain, and transfer the idea.

OUTPUT
First produce:
A. A concise curriculum map aligned with all supplied outcomes and the six taught classes.
B. A prerequisite progression showing what students need before each practical.
C. Three self-study blocks with allocations totalling six hours.
D. A simple project and assessment plan.
E. Any source gaps, tool assumptions, and workload concerns.

Then develop the requested lesson fully. If no lesson is specified, develop Official Class 1 fully.

For the full lesson include:
- Outcomes written as observable student actions.
- Materials and setup checks.
- A realistic minute-by-minute plan totalling 120 minutes.
- Teacher explanations and specific questions.
- Short student-facing notes and a glossary.
- Complete activities, datasets, code where useful, and expected results.
- Guided practice and an independent core task.
- Hints and a separately labelled teacher answer key.
- An exit ticket, assessment criteria, and reteaching options.
- A connection to the next official class.

Do not output superficial versions of every lesson. Finish the requested lesson at usable teaching depth.

COURSE MATERIAL
[Attach or paste the presenter’s manual here.]

RELEVANT BOOK CHAPTER / OFFICIAL QUESTIONS
[Attach or paste these if available; otherwise mark “not supplied”.]

CLASSROOM DETAILS
Learners: absolute beginners.
Class size: [unknown unless supplied].
Devices and internet: [unknown unless supplied].
Python environment: [unknown unless supplied].
Live API access: [unknown unless supplied].
Requested lesson: [Official Class 1 unless another is specified].
```

## Useful follow-up prompts

After the initial blueprint:

“Develop Official Class 2 fully using the agreed curriculum map. List prerequisites and reuse Class 1 vocabulary. Include the neural-network simulation and the required stock-prediction case study. Keep the total at 120 minutes.”

After a class:

“Students could run the example but struggled to explain [concept]. Create a 20-minute reteaching activity using a different concrete example, one prediction task, one tiny practical, and a new exit ticket. Include teacher answers.”

Before class:

“Audit this lesson for concepts and syntax used before they are taught, inaccurate analogies, impractical setup, unexplained code, and excessive workload. Revise it and explain the material corrections.”

For individual tutoring:

“Teach me [concept] as an absolute beginner. Use one small example at a time. Ask me to predict or explain before you give the answer. Give a hint if I struggle, then check with a different example. Track what I have demonstrated I understand.”

