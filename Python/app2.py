from flask import Flask,request,jsonify
from flask_cors import CORS
from statistics import *
from log1Calculator import *
from log2Calculator import *
from log3Calculator import *
import math

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

@app.route('/getNaturalLog',methods = ['GET'])
def log2Natural():
    data = dict(request.args)
    num = int(data["num"])
    result = ln(num)
    return jsonify({'result':result})

@app.route('/getLog',methods = ['GET'])
def log2Log():
    data = dict(request.args)
    num = int(data["num"])
    base = int(data["base"])
    result = log(num,base)
    return jsonify({'result':result})

@app.route('/getAntiLog',methods = ['GET'])
def log2AntiLog():
    data = dict(request.args)
    num = int(data["num"])
    base = int(data["base"])
    result = antiLog(num,base)
    return jsonify({'result':result})

@app.route('/getSine',methods = ['GET'])
def getSine():
    data = dict(request.args)
    num = int(data["num"])
    result = sine(num)
    return jsonify({'result':result})

@app.route('/getCosine',methods = ['GET'])
def getCosine():
    data = dict(request.args)
    num = int(data["num"])
    result = cosine(num)
    return jsonify({'result':result})

@app.route('/getTan',methods = ['GET'])
def getTan():
    data = dict(request.args)
    num = int(data["num"])
    result = tan(num)
    return jsonify({'result':result})

@app.route('/getCosec',methods = ['GET'])
def getCosec():
    data = dict(request.args)
    num = int(data["num"])
    result = sine(num)
    result = 1/result
    return jsonify({'result':result})

@app.route('/getSec',methods = ['GET'])
def getSec():
    data = dict(request.args)
    num = int(data["num"])
    result = cosine(num)
    result = 1/result
    return jsonify({'result':result})

@app.route('/getCot',methods = ['GET'])
def getCot():
    data = dict(request.args)
    num = int(data["num"])
    result = tan(num)
    result = 1/result
    return jsonify({'result':result}) 

@app.route('/getArcSin',methods = ['GET'])
def getArcSin():
    data = dict(request.args)
    num = float(data["num"])
    result = arcSin(num)
    return jsonify({'result':result})

@app.route('/getArcCos',methods = ['GET'])
def getArcCos():
    data = dict(request.args)
    num = float(data["num"])
    if num>1 or num < -1:
        result = "Enter number in range of -1 to 1"
    else:
        result = math.acos(num)
    return jsonify({'result':result})

@app.route('/getArcTan',methods = ['GET'])
def getArcTan():
    data = dict(request.args)
    num = float(data["num"])
    if num>1 or num < -1:
        result = "Enter number in range of -1 to 1"
    else:
        result = math.atan(num)
    return jsonify({'result':result})

if __name__ == '__main__':
	app.run(debug = True)