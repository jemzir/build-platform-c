const express = require('express');
const app = express();
const PORT = 5000;

const fs = require('fs');
const path = require('path');

// const CronJob = require('cron').CronJob;
// const job = new CronJob() // ("* * * * * *", functionality, onComplete, start)

const controller = require('./controllers/artifactController');
const build = require('./controllers/buildController')

// to allow for json body parsing
app.use(express.json())

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
app.use('/build', build.dependencyCheck, build.buildCopyClean, (req, res) => {
  res.status(200).json() // end the express cycle
})


// send the responses to the website
// throttle the responses and keep a cache of latest copies?
  // periodically fetch the commits
  // use node cron for scheduling

// app.get path for getting the c-program builds and its histories 
  // logic: go into git-repos and check the respective repos --
    // for every repo make a header: 
      // go into the repo and check the build_history dir, go through the files and list them with fail or success

// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});