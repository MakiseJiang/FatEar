import time
from flask import Flask

app = Flask(__name__)

@app.route('/')
def Hello():
    return "<p>Hello, world!</p>"

@app.route('/time')
def getCurrentTime():
    return {'time': time.time()}