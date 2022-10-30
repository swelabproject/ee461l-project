from flask import Flask, Response, jsonify
from pymongo import MongoClient
import os

#create Flask app
app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/')
def index():
    return app.send_static_file('index.html')

#define the 4 functions
@app.route('/projects/in/<projectID>&<int:qty>')
def checkIn_hardware(projectID, qty):
    resp = Response()
    msg = {'projectID':projectID, 'qty':qty}
    return jsonify(msg)

@app.route('/projects/out/<projectID>&<int:qty>')
def checkOut_hardware(projectID, qty):
    resp = Response()
    msg = {'projectID':projectID, 'qty':qty}
    return jsonify(msg)

@app.route('/projects/join/<projectID>')
def joinProject(projectID):
    resp = Response()
    msg = {'projectID':projectID}
    return jsonify(msg)

@app.route('/projects/leave/<projectID>')
def leaveProject(projectID):
    resp = Response()
    msg = {'projectID':projectID}
    return jsonify(msg)

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

#run Flask app
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 80))
