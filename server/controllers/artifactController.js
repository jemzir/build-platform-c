const shell = require('shelljs');

module.exports = {
  registerRepo: (req, res, next) => {
// git clone path/to/upstream/repo with any arbitrary git repo to a folder here... 
  // the folder should hold differnt multiple independent c programs
  // git clone <repo to clone> <location ending with directory name you want the repo under>
  // user should clone this build-platform and then cd into the repo folder:

  // parse the body and use the path to do the git clone path
  // use shelljs to execute git clone repoPath/url
  },

  checkRepo: (req, res, next) => {

  }
}