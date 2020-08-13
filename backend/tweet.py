import sys
import json
import requests
from os import path

api_key = 'REYx8AWMuPvryDDYi8KgQoNkC'
api_secret_key = 'O6lvWoF6GLN2MG5hrbSosFPWHYfLOK8FgvIsjouGgWO93AEvw8'
bearer_token = "AAAAAAAAAAAAAAAAAAAAABUXGwEAAAAA7d2ty5XcNgoo%2BNhN%2FOFOytNZujk%3D0CGdW4PRMRy3OwasYtmSXkXbBkiMuMAIdCax6URD3atO0JIqVz"

def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers

def create_url(tweet_query):
    tweets_url = 'https://api.twitter.com/1.1/search/tweets.json'

    # TODO could make result type togglable in the UI
    full_url = tweets_url + '?q=' + tweet_query + '&result_type=popular&tweet_mode=extended'
    return full_url

def file_exists(filename):
    return path.exists(filename)

def main():
    n = len(sys.argv)

    assert(n > 1)

    tweet_query = sys.argv[1]
    filename = '{}.json'.format(tweet_query)

    # dont send the request if we already have the data file saved
    if file_exists(filename):
        print(1)
        exit

    url = create_url(tweet_query)
    headers = create_headers(bearer_token)

    res = requests.request("GET", url, headers=headers)
    if res.status_code != 200:
        print(0)
        exit
        # raise Exception(res.status_code, res.text)


    with open("./json/{}".format(filename), 'w') as f:
        json.dump(res.json(), f)

    print(1)

if __name__ == "__main__":
    main()