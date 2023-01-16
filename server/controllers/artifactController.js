const shell = require('shelljs');

module.exports = {
  registerRepo: (req, res, next) => {
  // git clone <repo to clone> <location ending with directory name you want the repo under>
  // user should clone this build-platform and then cd into the repo folder:

  // parse the body and use the path to do the git clone path
  // use shelljs to execute git clone /path/to/repo or url 

  // make a build_history folder in here for later use
  },

  checkRepo: (req, res, next) => {
    // check if the repo already exists and then allow register if not exists
      // else do not go to next
  }
}