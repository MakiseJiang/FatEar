import time
from flask import Flask, request, jsonify
import pymysql

conn = pymysql.connect(host='localhost',
                       port = 8889,
                       user='root',
                       password='root',
                       db='FatEar_CS6083',
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)

app = Flask(__name__)

@app.route('/')
def Hello():
    return "<p>Hello, world!</p>"

@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}

@app.route("/LoginAuth", methods=["POST"])
def submit_form():
    # Grab data json from frontend
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Create cursor to send queries, execute query
    cursor = conn.cursor()
    query = 'SELECT * FROM user WHERE username = %s AND pwd = %s'
    cursor.execute(query, (username, password))
    db_data = cursor.fetchone()
    cursor.close()
    
    error = None
    if(db_data):
        #creates a session for the the user
        #session is a built in
        print("Login Success!")
    else:
        #returns an error message to the html page
        error = 'Invalid login or username'
        print(error)

    return data