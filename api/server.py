import json
from datetime import date, datetime, timezone, timedelta
from flask import Flask, request, jsonify, session
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager

import pymysql

conn = pymysql.connect(host='localhost',
                       port = 8889,
                       user='root',
                       password='root',
                       db='FatEar_CS6083',
                       charset='utf8mb4',
                       cursorclass=pymysql.cursors.DictCursor)


app = Flask(__name__)

app.config['JWT_SECRET_KEY'] = 'why would I tell you my secret key?'
jwt = JWTManager(app)


# Handles user login
@app.route("/token", methods=["POST"])
def submit_loginForm():
    # Grab data json from frontend
    data = request.json
    username = data.get('username')
    password = data.get('password')
    
    # Create cursor to send queries, execute query
    cursor = conn.cursor()
    query = 'SELECT * FROM user WHERE username = %s AND pwd = %s;'
    cursor.execute(query, (username, password))
    db_data = cursor.fetchone()
    cursor.close()
    
    passed = True if db_data else False
    if (passed):
        access_token = create_access_token(identity=username)
        return {'status': 'success', 'access_token': access_token}
    return {'status': 'error', 'message': 'Invalid username password combination'}, 401

# Handles user logout
@app.route("/logout", methods=["POST"])
def logout():
    response = jsonify({'msg': 'Logout successful'})
    unset_jwt_cookies(response)
    return response

# Refresh jwt token
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response


# Handles search function
@app.route("/Search", methods=["POST", "GET"])
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

# Get item info from mysql
@app.route("/GetItem", methods=["POST", "GET"])
def getItem_Info():
    data = request.json
    itemType = data.get('item_type') 
    itemID = data.get('item_id')
    reviews = []
 
    cursor = conn.cursor()

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
@jwt_required()
def postReview():
    data = request.json
    songID = data.get('songID')
    reviewText = data.get('reviewContent')
    rating = data.get('rate')
    username = get_jwt_identity()

    cursor = conn.cursor()
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
@jwt_required()
def getFriends():
    username = get_jwt_identity()
    cursor = conn.cursor()
    query = 'SELECT fname, lname, username              \
            FROM user JOIN friend ON username = user2   \
            WHERE user1 = %s AND acceptStatus = %s'
    cursor.execute(query, (username, 'Accepted'))
    db_data = cursor.fetchall()
    cursor.close()

    return db_data if db_data else []
    
# Get new friends request    

@app.route("/GetNotifications", methods=["GET"])
@jwt_required()
def getNotifications():
    username = get_jwt_identity()
    cursor = conn.cursor()
    query = 'SELECT fname, lname, username              \
            FROM user JOIN friend on username = user1   \
            WHERE user2 = %s AND acceptStatus = %s'
    cursor.execute(query, (username, 'Pending'))
    db_data = cursor.fetchall()
    cursor.close()
   
    return db_data if db_data else []

# Get News:
# New song released by subsribed (fanOf) artist
# New review posted by following and friends
@app.route("/GetNews", methods=["GET"])
@jwt_required()
def getNews():
    username = get_jwt_identity()
    cursor = conn.cursor()
    # Get new reviews
    query = "SELECT username, title, reviewText, reviewDate \
            FROM reviewSong NATURAL JOIN song   \
            WHERE username IN (                 \
                SELECT follows                  \
                FROM follows                    \
                WHERE follower = %s             \
                UNION                           \
                SELECT user2                    \
                FROM friend                     \
                WHERE user1 = %s                \
                AND acceptStatus = 'Accepted'   \
            )                                   \
            AND reviewDate > (                  \
                SELECT lastlogin                \
                FROM user                       \
                where username = %s             \
            )"
    cursor.execute(query, (username, username, username))
    new_reviews = cursor.fetchall()
    # Get new songs
    query = "SELECT title, songURL                      \
            FROM song NATURAL JOIN artistPerformsSong   \
            WHERE artistID IN(                          \
                SELECT artistID                         \
                FROM userFanOfArtist                    \
                WHERE username = %s                     \
            ) AND releaseDate > (                       \
                SELECT lastlogin                        \
                FROM user WHERE username = %s           \
            )"
    cursor.execute(query, (username, username))
    new_songs = cursor.fetchall()
    cursor.close()

    return {"new_reviews": new_reviews, "new_songs": new_songs}




