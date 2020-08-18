FROM golang:latest

# Install migrate
RUN go get github.com/mattes/migrate
RUN go get github.com/gorilla/mux
# Install python3-pip
RUN apt-get update && apt-get install -y python3-pip

COPY ./backend/cmd ./cmd
COPY ./backend/json ./json
COPY ./backend/tweet.py .
COPY ./backend/trending.py .

RUN pip3 install requests


CMD ["go", "run", "cmd/simple-service/main.go"]

