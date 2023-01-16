const shell = require('shelljs'); // for the buildCopyClean
const fs = require('fs');
const path = require('path');

module.exports = {
  // use fs for traversal of the git repo for reading/writing --> look for the git-repo
  // can add in ability to search for particular repo and then do the shit

  // **** any failed builds should be put into a version_numberX-f dir in build_history

  dependencyCheck: async (req, res, next) => {
    // dependencies all exist, all exists and clean exists
    try {
      const { repoName } = req.body;
      const absPath = path.resolve(__dirname, `../../git-repos/${repoName}`);
      await fs.readFile(`${absPath}/Makefile`, 'utf-8', (err, data) => {
        if (err) console.log('ERROR', err);
        console.log(data)
        shell.cd(absPath);
        console.log(shell.exec('make all')) // can have condition to check for stderr existence
      })
      res.send('success') 
    } catch (error) {
      
    }
  },

  orderCheck: (req, res, next) => {
    // dependencies are in good order (possible to combine with top?)
  },

  buildCopyClean: (req, res, next) => {
    // run the make, fs copy everything into a version_number dir and then clean it
      // the repo should have a dir called build_history... in there make the version_number dir
      // make a complete copy of everything into that version_numberX-s folder
      
      // make a hidden success_status file too? This will tell the system it is a good build
  }
}