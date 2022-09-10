# Import necessary libraries

from flask import Flask, request, jsonify, Response
import json
from flask_cors import CORS
from mllibcall import CallRandomForest

app = Flask(__name__)
# Initialize the Flask-Cors extension with default arguments
# To allow CORS for all domains on all routes
CORS(app)


@app.route('/addroute', methods=['GET'])
def call_random_forest():
    if request.method == 'GET':
        input_dict = request.args.to_dict()
        print(input_dict)
        response = CallRandomForest.get_rfresponse(input_dict)
        #s = json.dumps(response)
        #k = s.replace('\\', '')
        return jsonify(response)
    return jsonify({"status": 400, "message": "Incorrect Method call"})


@app.route('/')
def success():
    return "Success"


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
