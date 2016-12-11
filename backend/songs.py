import json
from pprint import pprint
import datetime
class Songs(object):
    TEST_FILE = 'songs.json'
    
    '''
    Class for handling our songs library. All songs are read from a JSON
    file which is given in the constructor.
    '''

    def __init__(self, data_file):
        '''
        Songs library constructor. All songs are read from the given file.

        @param data_file - Path to the JSON file containing the song definitions.
        '''
        with open(data_file) as data_file:
            data = json.load(data_file)
            self.songs = sorted(data['songs'], key=lambda song: datetime.datetime.strptime(song['released'], '%Y-%m-%d'),
           reverse=True)



    def get_songs(self, skip=0, count=20):
        '''
        List the songs in release date order (newest first).

        @param skip - Number of skipped songs from the beginning.
        @param count - Maximum number of songs returned.

        @return - songs array in JSON format
        '''
        return json.dumps(self.songs[skip:skip+count])

    def get_average_difficulty(self):
        '''
        Calculates the average difficulty of all songs.
        @return - average song difficulty with two decimals in JSON format.
            For example: {"avg_difficulty": 10.01}
        '''
        sum = 0
        for song in self.songs:
            sum+= song['difficulty']

        return json.dumps({"avg_difficulty": float("%.2f" % (sum / len(self.songs)))})


    def search_songs(self, phrase):
        '''
        Searches for songs. Search should take into account song's artist and title.

        @param phrase - Search phrase to be used (case insensitive).

        @return - songs in release date order (newest first) in JSON format (songs
            that matched the search)
        '''

        result = list(
            filter(
                lambda song: phrase.lower() in song['title'].lower() or phrase.lower() in song['artist'].lower(), self.songs
            )
        )

        return json.dumps(result)
