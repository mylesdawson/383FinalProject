## Goal

Connect to twitter api, recieve tweet data and display on a webpage

- The problem is contrived but I believe it showcases language communication and interaction quite well
- In reality it doesn't make much sense dispatching a python script from a golang server to make the request to twitter
- Makes more sense to have a python server which then dispatches golang scripts (for some problem that can use the power of goroutines)
- Saving .json files from the python script and reading them from the golang server was meant to showcase fake caching abilities

## Languages
Javascript (React):
- frontend code written in React and modern Javascript
- does some data processing (should probably be done in the backend in a real system!)
- programmatically displays the UI

Go
- Simple http server with an endpoint that listens to get requests and creates a new goroutine to handle them
- Dispatches python scripts to communicate with twitter API and create a json file
- Go reads created json file and returns the data or handles errors appropriately

Python
- Connect to twitter API endpoint and get data back
- save data in a .json file
- return status codes to Go to communicate success/failure of script

## Communication Methods
1. REST API
- Go has simple http server listening for any requests that come in
- JS code sends requests and handles responses from that API endpoint

2. Golang running Python Scripts
- Execute python file as a script with certain args
- cmd.CombinedOutput() listens to stdout/stderr from the script
- Use print(0) in the python file to indicate failure, print(1) to indicate successful completion

3. Writing and Reading from Files
- Python script on success writes a .json file in the json/ folder
- If golang gets a success message then it will try to read the json file

## Steps to Run
- As indicated in README.md: `sudo docker-compose build && sudo docker-compose run`
- View the frontend and make requests to the backend from: http://localhost:3000/

## Features to Look For
1. API (backend/frontend)
- Setup of backend server
- Frontend sending requests and handling responses from server

2. Script execution in Golang and error handling
- Passing args to python script
- Recieving status codes from the executed script
- Handling errors from script and other issues that might arise

3. React Frontend
- Functional-style coding (map, filter, functions as args) used to separate tweet from links it contains
- Container-Component Architecture
- React Routing
- Mapping array to array of components
- Using React Hooks