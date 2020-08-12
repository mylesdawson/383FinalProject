package main

import (
	"fmt"
	"log"
	"net/http"
	"os/exec"
)

func hello(w http.ResponseWriter, req *http.Request) {
	fmt.Fprintf(w, "Hello\n")
}

func gather_tweets(w http.ResponseWriter, req *http.Request) {
	// Assuming go run from inside backend/ folder
	cmd := exec.Command("/usr/bin/python3", "./tweet.py", "test")
	res, err := cmd.CombinedOutput()

	if err != nil {

	}

	// 1 indicates 'success', 0 indicates failure
	log.Printf("%s", res)
	
}

func main() {
	// Routes
	http.HandleFunc("/hello", hello)
	http.HandleFunc("/tweets", gather_tweets)

	log.Println("Server listening at http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
