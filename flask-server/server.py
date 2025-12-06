
import movie
from flask import Flask, jsonify, request

app = Flask(__name__)

favMovie = ""

@app.route("/movies", methods = ['GET'])
def testing():
    pass

def handleBackend(favMovie, isDescription):
    toReturn =  movie.takeInput(favMovie, isDescription)
    return jsonify(toReturn)


@app.route("/handleUserInput", methods = ['POST'])
def handleUserInput():
    data = request.json
    toRet = handleBackend(data['value'], data['isDescription'])
    return toRet

if __name__ == "__main__":
    app.run(debug= True)