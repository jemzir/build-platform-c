const cron = require('node-cron');
const express = require('express');
const app = express();
const PORT = 5000;

const fs = require('fs');
const path = require('path');

const controller = require('./controllers/artifactController');
const build = require('./controllers/buildController')



// to allow for json body parsing
app.use(express.json())

// static files for use
app.use(express.static(path.resolve(__dirname, '../views')));

// serve the initial landing page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});

// path for registering the repository
  // middleware: 'api', check if the directory name already exists, registering directory middleware, end
app.post('/api', controller.registerRepo, (req, res) => {
  res.status(200).json('success') // send the result back to the frontend req
})

// path for building the repo with make clean
  // middleware: check if build is okay (dependencies are there), check order, and then build
app.post('/build', build.dependencyCheck, build.buildCopyClean, build.versionTracker, (req, res) => {
  res.status(200).json('finished build') // end the express cycle
})

// path for front end to get data about dbtxtfile
app.post('/db', build.updateDB, (req, res) => {
  res.status(200).json(res.locals.data);
})

// send the responses to the website
// throttle the responses and keep a cache of latest copies?
  // periodically fetch the commits
  // use node cron for scheduling

// have a function that will buildCopyClean and then verstionTrack for all of the git-repos
  // 

cron.schedule("*/15 * * * * *", function () {
  console.log("---------------------");
  console.log("running a task every 15 seconds");
});

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});