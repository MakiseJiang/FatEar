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

# Test
@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}

# Handles user login
@app.route("/LoginAuth", methods=["POST", "GET"])
def submit_loginForm():
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
    
    passed = True if db_data else False  
   
    return {"userdata": data, "passed": passed}


# Handles search function
@app.route("/search", methods=["POST", "GET"])
def submit_searchQuery():
    data = request.json
    songname = data.get('songname')

    cursor = conn.cursor()
    query = 'SELECT * FROM song WHERE title = %s'
    cursor.execute(query, songname)
    db_data = cursor.fetchall()
    cursor.close()

    # Pack results in json
    json_data = []
    for result in db_data:
        json_data.append(result)

    return jsonify(json_data)

