import time
from datetime import date
from flask import Flask, request, jsonify, session
import pymysql

conn = pymysql.connect(host='localhost',
                       port = 8889,
                       user='root',
                       password='root',
                       db='FatEar_CS6083',
                       charset='utf8mb4',)

app = Flask(__name__)

app.config['SECRET_KEY'] = 'why would I tell you my secret key?'

# Handles user login
@app.route("/LoginAuth", methods=["POST", "GET"])
def submit_loginForm():
    # Grab data json from frontend
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Create cursor to send queries, execute query
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    query = 'SELECT * FROM user WHERE username = %s AND pwd = %s;'
    cursor.execute(query, (username, password))
    db_data = cursor.fetchone()
    cursor.close()
    
    passed = True if db_data else False
    if (passed):
        session['username'] = username
   
    return {"passed": passed}


# Handles search function
@app.route("/Search", methods=["POST", "GET"])
def submit_searchQuery():
    data = request.json
    songname = data.get('songname') 

    cursor = conn.cursor(pymysql.cursors.DictCursor)
    query = 'SELECT * FROM song WHERE title = %s'
    cursor.execute(query, songname)
    db_data = cursor.fetchall()
    cursor.close()

    # Pack results in json
    json_data = []
    for result in db_data:
        json_data.append(result)

    return jsonify(json_data)

# Get item info from mysql
@app.route("/GetItem", methods=["POST", "GET"])
def getItem_Info():
    data = request.json
    itemType = data.get('item_type') 
    itemID = data.get('item_id')
    reviews = []
 
    cursor = conn.cursor(pymysql.cursors.DictCursor)

    # Get song info and its reviews
    if itemType == 'song':
        cursor.execute('SELECT songID, title, releaseDate, songURL, artist.fname, artist.lname \
                       FROM song NATURAL JOIN artistPerformsSong NATURAL JOIN artist  \
                       WHERE songID = %s', itemID) 
        db_data = cursor.fetchone()
        query = 'SELECT * FROM reviewSong NATURAL JOIN user WHERE songID = %s'
        cursor.execute(query, itemID)
        reviewTexts_data = cursor.fetchall()

        for result in reviewTexts_data:
            reviews.append(result)
        db_data['reviews'] = reviews

    elif itemType == 'artist':
        cursor.execute('SELECT * FROM artist WHERE artistID = %s', itemID)
    else:
        cursor.execute('SELECT * FROM album WHERE albumID = %s', itemID)

    cursor.close()
 
    return jsonify(db_data) 

# Handle submit reviews and ratings
@app.route("/Submit-review-rating", methods=["POST", "GET"])
def postReview():
    data = request.json
    songID = data.get('songID')
    reviewText = data.get('reviewContent')
    rating = data.get('rate')
    username = session['username']

    cursor = conn.cursor(pymysql.cursors.DictCursor)
    params = (username, songID, reviewText, date.today())
    query = 'INSERT INTO reviewSong (username, songID, reviewText, reviewDate)  \
            VALUES (%s, %s, %s, %s)                                             \
            ON DUPLICATE KEY UPDATE                                             \
            reviewText = VALUES(reviewText), reviewDate = VALUES(reviewDate)'
    cursor.execute(query, params)
    conn.commit()
    cursor.close()

    return {"success": True}
 
# Get user's friends data
@app.route("/GetFriends", methods=["GET"])
def getFriends():
    username = session['username']

    cursor = conn.cursor(pymysql.cursors.DictCursor)
    query = 'SELECT fname, lname, username              \
            FROM user JOIN friend ON username = user2   \
            WHERE user1 = %s AND acceptStatus = %s'
    cursor.execute(query, (username, 'Accepted'))
    db_data = cursor.fetchall()
    cursor.close()

    return db_data
    
@app.route("/GetNotifications", methods=["GET"])
def getNotifications():
    username = session['username']
    cursor = conn.cursor(pymysql.cursors.DictCursor)
    query = 'SELECT fname, lname, username              \
            FROM user JOIN friend on username = user1   \
            WHERE user2 = %s AND acceptStatus = %s'
    cursor.execute(query, (username, 'Pending'))
    db_data = cursor.fetchall()
    cursor.close()

    return db_data 





