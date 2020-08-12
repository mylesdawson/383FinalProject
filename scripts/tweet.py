import sys
import json
import requests

api_key = 'REYx8AWMuPvryDDYi8KgQoNkC'
api_secret_key = 'O6lvWoF6GLN2MG5hrbSosFPWHYfLOK8FgvIsjouGgWO93AEvw8'
bearer_token = "AAAAAAAAAAAAAAAAAAAAABUXGwEAAAAA7d2ty5XcNgoo%2BNhN%2FOFOytNZujk%3D0CGdW4PRMRy3OwasYtmSXkXbBkiMuMAIdCax6URD3atO0JIqVz"

def create_headers(bearer_token):
    headers = {"Authorization": "Bearer {}".format(bearer_token)}
    return headers

def create_url(tweet_query):
    tweets_url = 'https://api.twitter.com/1.1/search/tweets.json'

    # TODO could make result type togglable in the UI
    full_url = tweets_url + '?q=' + tweet_query + '&result_type=popular'
    return full_url

def main():
    n = len(sys.argv)

    assert(n > 1)

    tweet_query = sys.argv[1]

    url = create_url(tweet_query)
    headers = create_headers(bearer_token)

    res = requests.request("GET", url, headers=headers)
    if res.status_code != 200:
        raise Exception(res.status_code, res.text)

    with open('data.json', 'w') as f:
        json.dump(res.json(), f)
    return res.json()

if __name__ == "__main__":
    main()