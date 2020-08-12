package main

import (
	"fmt"
	"log"
	"net/http"
)

func hello(w http.ResponseWriter, req *http.Request) {

	fmt.Fprintf(w, "Hello\n")
}

func main() {
	// Routes
	http.HandleFunc("/hello", hello)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
