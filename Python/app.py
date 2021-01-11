from flask import Flask

app = Flask(__name__)

# function for union - contains all elements of both set
@app.route('/union',methods = ['Get'])
def union(seta , setb):
    result = set()
    for i in seta:
        result.add(i)
    for i in setb:
        result.add(i)
    return result


# function for intersection - contains only common elements of set
@app.route('/intersection',methods = ['GET'])
def intersection(seta , setb):
    result = set()
    for i in seta:
        if i in setb:
          result.add(i)
    return result


# function for minus - contains elements which are not in another set
@app.route('/minus',methods = ['GET'])
def minus(seta , setb):
    result = set()
    for i in seta:
        if i not in setb:
            result.add(i)
    return result



if __name__ == '__main__':
	app.run(debug = True)