const express = require('express');
const app = express();
const PORT = 5000;

const cron = require('node-cron');
const fetch = require('cross-fetch')

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

cron.schedule("*/15 * * * * *", async function () {

  console.log("---------------------");
  console.log("running a task every 15 seconds");

  const getLatest = () => {
    gitRepos.forEach(async (repo) => {
      console.log('in get latest', repo);
      const response = await fetch(
        'http://localhost:5000/scheduled', 
        { 
          method: 'POST',  
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({repoName: repo})
        });

      console.log('in the cron!', response);
    });
  }

  const dirents = fs.readdirSync(
    path.resolve(__dirname, '../git-repos'), 
    { encoding: 'utf8', withFileTypes: 'true'},);
  
  const gitRepos = dirents.map(dirent => dirent.name);
  
  getLatest();
  // have middleware that change the req body...
  // go fs read through the git-repo folders and then run buildCopyClean and versionTracker
});

// route for scheduled
app.post('/scheduled', 
  (req, res, next) => {
    const { repoName } = req.body;
    console.log('req body of scheduled', req.body)
    return next();
  }, 
  build.dependencyCheck, build.buildCopyClean, build.versionTracker, (req, res) => {
  console.log('latest Version built!');
  res.status(200).json('latest Version grabbed!')
})
// check for port connection
app.listen(PORT, () => {
  console.log(`Listening in on PORT ${PORT}`);
});