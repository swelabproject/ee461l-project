from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/validateCredentials')
def validate_credentials():
    ## pass the username and password (which is in a post body)
    ## check to see if its in the data
    return jsonify('test - hit the server!!')


@app.route('/createNewUser')
def create_new_user():
    return jsonify('test - hit the server!!')

if __name__ == '__main__':
    app.run(debug=True)
