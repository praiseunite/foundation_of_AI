# This adjacency dictionary records the campus connections, not road costs.
# Each key is a location; its list names the locations reachable in one move.
graph = {
    "A": ["B", "C"],
    "B": ["A", "C", "D"],
    "C": ["A", "B", "E"],
    "D": ["B", "E", "F"],
    "E": ["C", "D", "F"],
    "F": ["D", "E"],
}


# A function packages the procedure and receives its graph, start, and goal.
def breadth_first_search(graph, start, goal):
    # Each queue item is a whole path, so the result can show how we arrived.
    frontier = [[start]]
    # A set records already discovered locations, preventing repeated cycles.
    discovered = {start}

    # A nonempty list is true here: continue while a candidate path exists.
    while frontier:
        # Remove the oldest path to preserve breadth-first (FIFO) ordering.
        path = frontier.pop(0)
        # Index -1 refers to the last item: the current end of this path.
        current = path[-1]

        # == compares values; reaching the goal returns the selected path.
        if current == goal:
            return path

        # Inspect every neighbour of the current location.
        for neighbour in graph[current]:
            # Skip locations already discovered, instead of repeating cycles.
            if neighbour not in discovered:
                discovered.add(neighbour)
                # + joins lists into a new path, preserving the existing path.
                frontier.append(path + [neighbour])

    # An exhausted queue means no route exists in the supplied graph.
    return None


# Call the function with the map, starting location, and destination.
route = breadth_first_search(graph, "A", "F")
# Print the returned list; this program finds fewest moves, not weighted cost.
print(route)
