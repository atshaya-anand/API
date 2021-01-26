import math
import sys

def mean(values):
  #print("sum",sum(values),float(len(values)))
	return sum(values) / float(len(values))

def avg_calc(ls):
    n, mean = len(ls), 0.0

    if n <= 1:
        return ls[0]

    # calculate average
    for el in ls:
        mean = mean + float(el)
    mean = mean / float(n)

    return mean

def sd_calc(data):
    n = len(data)

    if n <= 1:
        return 0.0

    mean, sd = avg_calc(data), 0.0

    # calculate stan. dev.
    for el in data:
        sd += (float(el) - mean)**2
    sd = math.sqrt(sd / float(n-1))

    return sd

def variance(data):
     # Number of observations
     n = len(data)
     # Mean of the data
     mean = sum(data) / n
     # Square deviations
     deviations = [(x - mean) ** 2 for x in data]
     # Variance
     variance = sum(deviations) / n
     return variance

def covariance(x, mean_x, y, mean_y):
	covar = 0.0
	for i in range(len(x)):
		covar += (x[i] - mean_x) * (y[i] - mean_y)
	return covar

# Calculate the variance of a list of numbers
def variance2(values, mean):
	return sum([(x-mean)**2 for x in values])

def coefficients(dataset):
	x = [row[0] for row in dataset]
	y = [row[1] for row in dataset];print("x,y",x,y)
	x_mean, y_mean = mean(x), mean(y);print(x_mean,y_mean,"mean")
	b1 = covariance(x, x_mean, y, y_mean) / variance2(x, x_mean)
	b0 = y_mean - b1 * x_mean
	return [b0, b1]

def simple_linear_regression(train, test):
	predictions = list()
	b0, b1 = coefficients(train);print(b0,b1)
	for row in test:
		yhat = b0 + b1 * row[0]
		predictions.append(yhat)
	return predictions

def linear_regression(dataset):
  test_set = list()
  for row in dataset:

    row_copy = list(row)
    row_copy[-1] = None
    test_set.append(row_copy)
  print(test_set,dataset,"fewde")
  predicted = simple_linear_regression(dataset,test_set)
  print(predicted)
  actual = [row[-1] for row in dataset]
  return predicted