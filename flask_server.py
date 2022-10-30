import certifi
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
import pymongo

app = Flask(__name__, static_folder='app/build', static_url_path='')
cors = CORS(app)


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/validateCredentials', methods=['POST'])
@cross_origin()
def validate_credentials():
    try:
        data = request.json
        user = data['user']
        password = data['password']
        print(user)
        print(password)
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
        db = client_connection.SWELAB
        col = db.Users
        print("connected possibly")
        found = col.find_one({"id": user, "password": password})
        print(found)
        if col.count_documents(found):
            return jsonify({"validation": 'valid'})
        else:
            return jsonify({"validation": 'invalid'})
    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        return jsonify({"validation": 'invalid'})


# @app.route('/createNewUser', methods=['POST'])
# @cross_origin()
# def create_new_user():


@app.route('/manageproject/in/<projectID>&<int:qty>')
def checkIn_hardware(projectID, qty):
    resp = Response()
    msg = {'projectID':projectID, 'qty':qty}
    return jsonify(msg)

@app.route('/manageproject/out/<projectID>&<int:qty>')
def checkOut_hardware(projectID, qty):
    resp = Response()
    msg = {'projectID':projectID, 'qty':qty}
    return jsonify(msg)


if __name__ == '__main__':
    app.run(debug=True)
