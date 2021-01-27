from flask import Flask,request,jsonify
from flask_cors import CORS
from statistics import *
from log2Calculator import *

app = Flask(__name__)
CORS(app)


@app.route('/getStandardDeviation',methods = ['GET'])
def staticticStandardDeviation():
    data = dict(request.args)
    dataSet = data["data"].split(",")
    dataSet = [int(x) for x in dataSet]
    print(type(dataSet),dataSet)
    result = sd_calc(dataSet)
    return jsonify({'result':result})

@app.route('/getVariance',methods = ['GET'])
def staticticVariance():
    data = dict(request.args)
    dataSet = data["data"].split(",")
    dataSet = [int(x) for x in dataSet]
    print(type(dataSet),dataSet)
    result = variance(dataSet)
    return jsonify({'result':result})

@app.route('/getLinearRegression',methods = ['GET'])
def staticticLinearRegression():
    data = dict(request.args)
    dataSet = data["data"].split(",")
    dataSet = [int(x) for x in dataSet]
    print(type(dataSet),dataSet)
    if len(dataSet)%2 !=0:
        result = "dataset is not proper"
        return jsonify({'result':result})
    rows = len(dataSet)//2
    cols = 2
    count = 0
    matrix = []
    for i in range(rows):
        temp = []
        for j in range(cols):
            temp.append(dataSet[count])
            count+=1
        matrix.append(temp)
    print(rows,'----',cols,'----',matrix)

    result = linear_regression(matrix)
    return jsonify({'result':result})

@app.route('/getGCD',methods = ['GET'])
def log2GCF():
    data = dict(request.args)
    num1 = int(data["num1"])
    num2 = int(data["num2"])
    result = computeGCD(num1,num2)
    return jsonify({'result':result})

@app.route('/getLCM',methods = ['GET'])
def log2LCF():
    data = dict(request.args)
    num1 = int(data["num1"])
    num2 = int(data["num2"])
    result = computeLcm(num1,num2)
    return jsonify({'result':result})

@app.route('/getnRoot',methods = ['GET'])
def log2Root():
    data = dict(request.args)
    root = int(data["n"])
    num = int(data["num"])
    result = nthroot(root,num)
    return jsonify({'result':result})

if __name__ == '__main__':
	app.run(debug = True)