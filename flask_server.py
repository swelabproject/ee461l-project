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

@app.route('/createProject', methods=['POST'])
@cross_origin()
def create_project():
    print("in create project")
    try:
        data = request.json
        projectname = data['projectname']
        projectid = data['projectid']
        users = data['validusers']
        description = data['description']
        post = {"name": projectname,
                "id": projectid,
                "description": description,
                "users": users,
                "checkedout_hw1": 0,
                "checkedout_hw2": 0}
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
        db = client_connection.SWELAB
        col = db.Projects
        col2 = db.Users
        print("connected possibly")
        found = col.find_one({"id": projectid})
        if col.count_documents(found):
            print("id exists")
            print(found)
            return jsonify({"existing": 'true'})

    except Exception as ex:
        print("adding project to db")
        post_id = col.insert_one(post).inserted_id  # adds the document to the collection
        print(users)
        for i in users:
            print(users[i])
            col2.update_one({'id': users[i]}, {'$push': {'authorized_projects': projectid}})

        return jsonify("no existing project found")

@app.route('/createNewUser' , methods=['POST'])
@cross_origin()
def create_new_user():
    print("in create user")
    try:
        data = request.json
        user = data['user']
        password = data['password']
        id = data['UserID']
        authorize_projects = []
        joined_projects = []

        post = {"id": id,
                "name": user,
                "password": password,
                "authorized_projects" : authorize_projects,
                "joined_projects": joined_projects
                }
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())

        db = client_connection.SWELAB
        col = db.Users
        print("connected possibly")

        found = col.find_one({"id": id})
        if col.count_documents(found):
            print("user id exists")
            print(found)
            return jsonify({"existing": 'true'})

    except Exception as ex:
        print("adding user to db")
        post_id = col.insert_one(post).inserted_id  # adds the document to the collection
        return jsonify("no existing user ID found ; adding user to db")


if __name__ == '__main__':
    app.run(debug=True)
