const http = require('http');
const fs = require('fs')
const url = require('url');
const figlet = require('figlet')
const querystring = require('querystring');
// const express = require("expess")


const server = http.createServer(function(req, res) {
  const params = querystring.parse(url.parse(req.url).query);

  const page = url.parse(req.url).pathname;
  // const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/html'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/css'
      });
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {
        'Content-Type': 'text/javascript'
      });
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ('choices' in params) {
      res.writeHead(200, {
        'Content-Type': 'application/json'
      });
      let chosenButton = params['choices'];
      console.log(chosenButton)
      // random values
      let random = Math.floor(Math.random() * 5)
      // array containing choices
      //
      let winner;

      let temp = ["spock", "scissor", "rock", "paper", "lizard"];
      let pick = temp[random];
      console.log(pick)
      if (pick === chosenButton) {
        winner = "its a Tie"
      } else if ((pick === "rock") && (chosenButton === "lizard" || chosenButton === "scissor")) {
        winner = "Bot wins"
      } else if ((pick === "scissor") && (chosenButton === "lizard" || chosenButton === "paper")) {
        winner = "Bot wins"
      } else if ((pick === "spock") && (chosenButton === "scissor" || chosenButton === "rock")) {
        winner = "Bot wins"
      } else if ((pick === "paper") && (chosenButton === "spock" || chosenButton === "rock")) {
        winner = "Bot wins"
      } else if ((pick === "lizard") && (chosenButton === "spock" || chosenButton === "paper")) {
        winner = "Bot wins"


      } else if ((chosenButton === "rock") && (pick === "lizard" || pick === "scissor")) {
        winner = "You win"
      } else if ((chosenButton === "scissor") && (pick === "lizard" || pick === "paper")) {
        winner = "You win"
      } else if ((chosenButton === "spock") && (pick === "scissor" || pick === "rock")) {
        winner = "You win"
      } else if ((chosenButton === "paper") && (pick === "spock" || pick === "rock")) {
        winner = "You win"
      } else if ((chosenButton === "lizard") && (pick === "spock" || pick === "paper")) {
        winner = "You win"

      } else {
        winner = "Carolin "
      }



      const obj = {
        answer: winner
      };


      //rock beats lizard
      //rock beats scissor

      //lizard beats paper
      //lizard beats spock

      //spock beats scissor
      //spock beats rock

      //scissor beats lizard
      //scissor beats paper

      //paper beats rock
      //paper beats spock

      res.end(JSON.stringify(obj));
    }
  } else {
    figlet('404!!', function(err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);