const express = require('express');
const app = express();
const PORT = 5000;

const fs = require('fs');
const path = require('path');

// git clone path/to/upstream/repo with any arbitrary git repo to a folder here... 
  // the folder should hold differnt multiple independent c programs
  // user should clone this build-platform and then cd into the repo folder:


app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// use fs for traversal of the git repo for reading/writing --> look for the git-repo
  // can add in ability to search for particular repo and then do the shit
// middleware for using make in terminal


// send the responses to the website
// throttle the responses and keep a cache of latest copies?
  // periodically fetch the commits


// serve the website

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});