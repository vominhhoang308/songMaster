from flask import Flask, request, session
import json
from flask_cors import CORS, cross_origin
from songs import Songs

#Start the API
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/songs', methods=['GET'])
def get_all_songs():
    skip = int(request.args.get('skip', 0))
    count = int(request.args.get('count', 20))

    songs_library = Songs(Songs.TEST_FILE)
    return songs_library.get_songs(skip, count)


@app.route('/songs/avg/difficulty', methods=['GET'])
def get_songs_average_difficulty():
    songs_library = Songs(Songs.TEST_FILE)
    return songs_library.get_average_difficulty()


@app.route('/songs/search', methods=['GET'])
def search_songs():
    phrase = request.args.get('phrase', '')
    songs_library = Songs(Songs.TEST_FILE)
    return songs_library.search_songs(phrase)

####### THIS IS THE CORRECT WAY TO DO THAT IN THE PRODUCTION, I STORED THE LIST OF SONGS THAT IS ALREADY CLICKED IN SESSION
####### HOWEVER, WHEN I AM DOING THIS EXERCISE, I AM RUNNING FRONT END ON DIFFERENT PORT WITH THE BACKEND, THEREFORE I HAVE TO DO THE CROSS DOMAIN REQUEST
####### AND SESSION CANNOT BE UPDATED WITH CROSSDOMAIN REQUEST
####### THATS WHY I AM CREATING A QUICK AND DIRTY WAY TO DO THIS EXERCISE, WHICH IS THE "NOT COMMENTED" PART JUST TO SHOW THE JUDGE HOW FRONTEND WILL REACT IF SONGS HAS BEEN CLICKED AND NOTCLICKED


# @app.route('/songs/<id>/meta', methods=['GET'])
# def get_songs_meta(id):
#     meta = session.get('songs_meta', {'clicked_song':[]})
#     return json.dumps({"Clicked": True if len(list(filter(lambda song: song == id, meta['clicked_song']))) != 0 else False})

# @app.route('/songs/<id>/meta', methods=['POST'])
# def set_songs_meta(id):
#     meta = session.get('songs_meta', {'clicked_song':[]})
   
#     song_meta = list(filter(lambda song: song == id, meta['clicked_song']))
#     if len(song_meta) == 0:
#         meta['clicked_song'].append(id)
#     for index in song_meta:
#         if index == id:
#             meta['clicked_song'].remove(id)
#         else:
#             meta['clicked_song'].append(id)

#     session['songs_meta'] = meta
#     return get_songs_meta(id)
#     

####### THIS IS THE QUICK WAY THAT I AM TALKING ABOUT IN THE PREVIOUS PART

clickedList = [];
@app.route('/songs/<id>/meta', methods=['POST'])
def set_songs_meta(id):
    if id in clickedList:
        clickedList.remove(id)
    else:
        clickedList.append(id)
    return get_songs_meta(id)

@app.route('/songs/<id>/meta', methods=['GET'])
def get_songs_meta(id):
    for index in clickedList:
        if index == id:
            return json.dumps({"Clicked": True})
    return json.dumps({"Clicked": False})


app.secret_key = 'our secret!'
#app.config['SESSION_TYPE'] = 'filesystem'
app.run(port=5005, debug=True, threaded=True)
