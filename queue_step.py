frontier = ["Gate"]
current = frontier.pop(0)
neighbours = ["Library", "Lab"]
frontier.extend(neighbours)
print(current)
print(frontier)
