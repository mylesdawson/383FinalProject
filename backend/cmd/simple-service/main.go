package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello\n")
}

func gather_tweets(w http.ResponseWriter, req *http.Request) {

	keys, ok := req.URL.Query()["type"]

	if !ok || len(keys[0]) < 1 {
		http.Error(w, "Enter query parameter at the end of the url: ?type=x", http.StatusBadRequest)
		return
	}

	key := keys[0]
	log.Println("Url Param 'key' is: " + key)

	// Assuming go run from inside backend/ folder
	cmd := exec.Command("/usr/bin/python3", "./tweet.py", key)
	res, err := cmd.CombinedOutput()

	if err != nil {
		http.Error(w, "Error when running python script to get tweet data", http.StatusInternalServerError)
		return
	}

	// 1 indicates 'success', 0 indicates failure
	log.Printf("%s", res)
	if string(res) == "0" {
		http.Error(w, "Request to twitter endpoint failed", http.StatusInternalServerError)
		return
	}

	// 1) Read from json file
	filename := key + ".json"
	plan, err := ioutil.ReadFile(filename)
	if err != nil {
		http.Error(w, "Failed to read from file", http.StatusInternalServerError)
		return
	}
	var data interface{}

	er := json.Unmarshal(plan, &data)

	if er != nil {
		http.Error(w, "Failed to unmarshal json data", http.StatusInternalServerError)
		return
	}

	// 2) Send json data
	js, err := json.Marshal(data)

	if err != nil {
		http.Error(w, "Failed to marshal json data", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(js)

}

func main() {
	// Go creates a goroutine when a new connection is accepted!
	// Routes.
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/tweets", gather_tweets)

	log.Println("Server listening at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
