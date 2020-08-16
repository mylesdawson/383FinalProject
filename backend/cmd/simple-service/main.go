package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/mux"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello\n")
}

func gather_tweets(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")

	keys, ok := req.URL.Query()["type"]
	fmt.Printf("%s\n", req.URL)

	if !ok || len(keys[0]) < 1 {
		http.Error(w, "Enter query parameter at the end of the url: ?type=x", http.StatusBadRequest)
		return
	}
	q_type := keys[0]

	keys, ok = req.URL.Query()["lang"]

	lang := ""
	if ok {
		lang = keys[0]
	}
	fmt.Printf("lang is: %s\n", lang)

	cmd := exec.Command("/usr/bin/python3", "./tweet.py", q_type, lang)
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
	filename := "./json/" + q_type + ".json"
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

	r := mux.NewRouter()

	r.HandleFunc("/hello", hello)
	r.HandleFunc("/tweets", gather_tweets)

	log.Println("Server listening at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}
