"""Session 6: a fictional campus assistant using rules and route search.

Run: python session06_capstone.py
Original supplementary exercise. Offline; no model, API, or third-party package.
Begin with the fact/rule functions. The search internals are optional stretch work.
"""


def not3(value):
    """Our deliberately chosen three-valued NOT: Unknown stays Unknown."""
    # None represents missing evidence; it does not mean False in this model.
    if value is None:
        return None
    return not value


def and3(*values):
    """False dominates AND; otherwise a missing condition makes it Unknown."""
    # *values collects a variable number of arguments into a tuple.
    if False in values:
        return False
    if None in values:
        return None
    return True


def may_enter(enrolled, trained, suspended):
    # Parentheses call functions; the result of not3 is an input to and3.
    return and3(enrolled, trained, not3(suspended))


# A graph is a dictionary mapping each location to its neighbours and road costs.
# Roads are undirected, so each road appears at both ends.
GRAPH = {
    "A": {"B": 1, "C": 4},        # A: Gate
    "B": {"A": 1, "C": 1, "D": 8},  # B: Library
    "C": {"A": 4, "B": 1, "D": 2},  # C: Lab
    "D": {"B": 8, "C": 2},        # D: Delivery (the search goal)
}
ROAD_SETS = {"open": (), "gate": ("A-B",), "isolated": ("B-D", "C-D")}


# OPTIONAL STRETCH: uniform-cost search chooses the cheapest waiting path.
def cheapest_route(blocked=(), unit_cost=False):
    """Return (path, cost), or None if Delivery is unreachable.

    The graph has positive costs. Accept the goal when selected, not merely seen.
    """
    # Each waiting entry is (cost, tie_order, location, path).
    # The tie order keeps earlier candidates first when costs are equal.
    waiting = [(0, 0, "A", ["A"])]
    best = {"A": 0}    # Cheapest discovered cost to each location.
    sequence = 1

    # Continue while there are discovered candidates waiting for selection.
    while waiting:
        waiting.sort(key=lambda entry: (entry[0], entry[1]))
        cost, _, location, path = waiting.pop(0)
        if cost != best[location]:
            continue   # A cheaper candidate already replaced this old one.
        if location == "D":
            return path, cost

        # sorted gives deterministic alphabetical neighbour ordering.
        for neighbour in sorted(GRAPH[location]):
            # Sort the endpoints so A-B and B-A describe the same closed road.
            road = "-".join(sorted((location, neighbour)))
            if road in blocked:
                continue
            step_cost = 1 if unit_cost else GRAPH[location][neighbour]
            new_cost = cost + step_cost
            # .get supplies infinity for a location not discovered yet.
            if new_cost < best.get(neighbour, float("inf")):
                best[neighbour] = new_cost
                waiting.append((new_cost, sequence, neighbour, path + [neighbour]))
                sequence += 1
    return None


def assistant(question="entry", enrolled=True, trained=True,
              suspended=False, roads="open"):
    # Default arguments make a first run easy; named arguments change one case.
    # Use only facts relevant to the question. These hours are fictional evidence.
    if question == "hours":
        return "Lab 2 opens from 09:00 to 17:00 on weekdays. [F1]"
    if question == "fee":
        return "The supplied excerpt does not state a fee. Check with the campus office."
    if question != "entry":
        return "Choose entry, hours, or fee."

    permission = may_enter(enrolled, trained, suspended)
    if permission is None:
        return "Ask for the missing enrolment, training, or suspension record."
    if permission is False:
        return "The fictional access condition is not satisfied."

    route = cheapest_route(ROAD_SETS[roads])
    if route is None:
        return "Access condition satisfied, but Delivery is unreachable."
    path, cost = route
    return ("Access condition satisfied. Route to Delivery: " + " -> ".join(path)
            + f"; total cost {cost}. This does not confirm a booking or delivery.")


# This guard runs examples when executing the file directly, but not on import.
if __name__ == "__main__":
    examples = [
        ("All requirements supported", {}),
        ("Training evidence missing", {"trained": None}),
        ("Suspended", {"suspended": True}),
        ("Delivery isolated", {"roads": "isolated"}),
        ("Gate-Library closed", {"roads": "gate"}),
        ("Hours", {"question": "hours"}),
        ("Fee", {"question": "fee"}),
    ]
    for title, settings in examples:
        # **settings passes dictionary entries as named function arguments.
        print(title + ": " + assistant(**settings))

# CHALLENGE: choose a library-loan task. Which facts and rule would change?
# Explain why adding more AI would not automatically fix a missing policy fact.
