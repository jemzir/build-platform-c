const express = require('express');
const app = express();
const PORT = 5000;

const fs = require('fs');
const path = require('path');
const controller = require('./controllers/artifactController');

// serve the initial landing page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// path for registering the repository
  // middleware: 'api', check if the directory name already exists, registering directory middleware, end
app.post('/api', controller.checkRepo, controller.registerRepo, (req, res) => {
  res.status(200).json() // send the result back to the frontend req
})

// use fs for traversal of the git repo for reading/writing --> look for the git-repo
  // can add in ability to search for particular repo and then do the shit

// send the responses to the website
// throttle the responses and keep a cache of latest copies?
  // periodically fetch the commits
  // use node cron for scheduling

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});