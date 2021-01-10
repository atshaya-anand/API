from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
	data1 = {2,3,4,5,6,7,8}
	data2 = {21,42,63,84}
	result = data1.union(data2)
	return str(result)


if __name__ == '__main__':
	app.run(debug = True)