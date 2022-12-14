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
    print("hi")
    try:
        data = request.json
        user = data['user']
        password = data['password']
        print(user)
        print(password)
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())
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
        return jsonify({"validation": 'poop'})


# @app.route('/createNewUser')
# @cross_origin()
# def create_new_user():
#     return jsonify('test - hit the server!!')


@app.route("/validateUsername", methods=['POST'])
@cross_origin()
def validate_username():
    try:
        data = request.json
        user = data['user']
        name = data['name']
        client_connection = pymongo.MongoClient(
            "mongodb+srv://pwang:poOA8uRsRRu0ZoLx@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())
        db = client_connection.SWELAB
        col = db.Users
        found = col.find_one({"id": user, "name": name})
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
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())
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


@app.route("/getAuthorizedProjects", methods=['POST'])
@cross_origin()
def getAuthorizedProjects():
    print("#####################")
    try:
        data = request.json
        user = data["username"]
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())
        db = client_connection.SWELAB
        col = db.Users
        print("hi")
        found = col.find_one({"id": user})
        if col.count_documents(found):
            print(found)
            return jsonify({"projects": found['authorized_projects']})
        else:
            print("no")
            return jsonify({"validation": 'invalid'})

    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        return jsonify({"validation": 'invalid'})


@app.route("/getAuthorizedProjectNames", methods=['POST'])
@cross_origin()
def getAuthorizedProjectNames():
    try:
        data = request.json
        projectid = data['projectid']
        client_connection = pymongo.MongoClient(
            "mongodb+srv://jgirish:DrLQnjpMZlqiUjm9@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority",
            tlsCAFile=certifi.where())
        db = client_connection.SWELAB
        col2 = db.Projects
        id2Name = col2.find({"id": projectid})
        if col2.count_documents(id2Name):
            return jsonify({"projectName": id2Name.name})
        else:
            return jsonify({"validation": 'invalid'})
    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        message = template.format(type(ex).__name__, ex.args)
        print(message)
        return jsonify({"validation": 'invalid'})
    
#manage project

@app.route('/manageproject/<projectID>')
@cross_origin()
def retrieve(projectID):
    client = pymongo.MongoClient("mongodb+srv://vsaakes:4a8ssvbrPurRpKaP@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
    db = client.SWELAB
    sets = db.HWSet
    set1 = sets.find_one({"name": "HWSet1"})
    set2 = sets.find_one({"name": "HWSet2"})
    projs = db.Projects
    proj = projs.find_one({"id": projectID})
    msg = {'Ava1': set1["availability"], 'Ava2': set2["availability"], 'Out1': proj["checkedout_hw1"], 'Out2': proj["checkedout_hw2"]}
    client.close()
    return jsonify(msg)

@app.route('/manageproject/in1/<projectID>&<int:qty>&<int:ava>')
@cross_origin()
def checkIn_hardwareSet1(projectID, qty, ava):
    client = pymongo.MongoClient("mongodb+srv://vsaakes:4a8ssvbrPurRpKaP@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
    db = client.SWELAB
    projs = db.Projects
    proj = projs.find_one({"id": projectID})
    out = proj["checkedout_hw1"]
    if qty > out:
        qty=out
    if qty <= (100 - ava):
        ava+=qty
    else:
        qty=100-ava
        ava=100
    sets = db.HWSet
    sets.update_one({"name": "HWSet1"}, { "$set": { 'availability': ava } })
    projs.update_one({"id": projectID}, { "$set": { 'checkedout_hw1': proj["checkedout_hw1"] - qty } })
    msg = {'qty':qty}
    client.close()
    return jsonify(msg)

@app.route('/manageproject/in2/<projectID>&<int:qty>&<int:ava>')
@cross_origin()
def checkIn_hardwareSet2(projectID, qty, ava):
    client = pymongo.MongoClient("mongodb+srv://vsaakes:4a8ssvbrPurRpKaP@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
    db = client.SWELAB
    projs = db.Projects
    proj = projs.find_one({"id": projectID})
    out = proj["checkedout_hw2"]
    if qty > out:
        qty=out
    if qty <= (100 - ava):
        ava+=qty
    else:
        qty=100-ava
        ava=100
    sets = db.HWSet
    sets.update_one({"name": "HWSet2"}, { "$set": { 'availability': ava } })
    projs.update_one({"id": projectID}, { "$set": { 'checkedout_hw2': proj["checkedout_hw2"] - qty } })
    msg = {'qty':qty}
    client.close()
    return jsonify(msg)

@app.route('/manageproject/out1/<projectID>&<int:qty>&<int:ava>')
@cross_origin()
def checkOut_hardwareSet1(projectID, qty, ava):
    client = pymongo.MongoClient("mongodb+srv://vsaakes:4a8ssvbrPurRpKaP@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
    db = client.SWELAB
    sets = db.HWSet
    projs = db.Projects
    if qty <= ava:
        ava-=qty
    else:
        qty=ava
        ava=0
    sets.update_one({"name": "HWSet1"}, { "$set": { 'availability': ava } })
    proj = projs.find_one({"id": projectID})
    projs.update_one({"id": projectID}, { "$set": { 'checkedout_hw1': proj["checkedout_hw1"] + qty } })
    msg = {'qty':qty}
    client.close()
    return jsonify(msg)

@app.route('/manageproject/out2/<projectID>&<int:qty>&<int:ava>')
@cross_origin()
def checkOut_hardwareSet2(projectID, qty, ava):
    client = pymongo.MongoClient("mongodb+srv://vsaakes:4a8ssvbrPurRpKaP@swelab.bo7ayiw.mongodb.net/?retryWrites=true&w""=majority", tlsCAFile=certifi.where())
    db = client.SWELAB
    sets = db.HWSet
    projs = db.Projects
    if qty <= ava:
        ava-=qty
    else:
        qty=ava
        ava=0
    sets.update_one({"name": "HWSet2"}, { "$set": { 'availability': ava } })
    proj = projs.find_one({"id": projectID})
    projs.update_one({"id": projectID}, { "$set": { 'checkedout_hw2': proj["checkedout_hw2"] + qty } })
    msg = {'qty':qty}
    client.close()
    return jsonify(msg)


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
