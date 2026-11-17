colour = 0.8
shape = 0.4
weight_colour = 0.6
weight_shape = 0.3
bias = -0.5
score = colour * weight_colour + shape * weight_shape + bias
print(round(score, 3))
print(score >= 0)
