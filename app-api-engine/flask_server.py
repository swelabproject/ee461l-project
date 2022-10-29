#from flask import Flask, jsonify

from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS, cross_origin
import pymongo

app = Flask(__name__, static_folder='app/build', static_url_path='')
cors = CORS(app)

#app = Flask(__name__)


@app.route('/validateCredentials')
def validate_credentials():
    return jsonify('test - hit the server!!')


@app.route('/createNewUser', methods=['post'])
def create_new_user():
    try:
        data = request.json
        user = data['user']
        password = data['password']

        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority")
        db = client_connection.SWELAB
        col = db.Users
        found = col.find_one({"id": user, "password": password})
        if found.toString() == 'None':
            #return jsonify({"validation": 'invalid'})

        else:
            return jsonify({"validation": 'invalid'})
    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        return jsonify({"validation": 'invalid'})


    #return jsonify('test - hit the server!!')


if __name__ == '__main__':
    app.run(debug=True)
