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
      let result = {};
      const absPath = path.resolve(__dirname, `../../git-repos/${repoName}`);
        shell.cd(absPath);
        const { stdout, stderr } = (shell.exec('make all'))

        if (stderr.length > 0) {
          console.log('the error!', stderr);
          result.statusMessage =  stderr, 
          result.success = false;
          res.locals.result = result;
        } else {
          result.statusMessage =  stdout, 
          result.success = true;
          console.log(result)
          res.locals.result = result;
        }

      return next();
    } catch (error) {
      return next('error message');
    }
  },

  buildCopyClean: (req, res, next) => {
    // run the make, fs copy everything into a version_number dir and then clean it
      // the repo should have a dir called build_history... in there make the version_number dir
      // make a complete copy of everything into that version_numberX-s folder

      console.log('reslocalsstdout', res.locals.result);
      // ^^ we now have a res.locals status message and success value


      res.send('buildCopyClean done')
  }
}