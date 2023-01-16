const shell = require('shelljs');
const path = require('path');

module.exports = {
  registerRepo: (req, res, next) => {
  // git clone <repo to clone> <location ending with directory name you want the repo under>
  // user should clone this build-platform and then cd into the repo folder:

  // parse the body and use the path to do the git clone path
  // use shelljs to execute git clone /path/to/repo or url 

  // make a build_history folder in here for later use
  console.log(req.body);
  const { repo } = req.body; // can be path or url
  const { repoName } = req.body;

  const absPath = path.resolve(__dirname, '../../git-repos');
  console.log(absPath)
  shell.exec(`git clone ${repo} ${absPath}/${repoName}`);
  shell.exec(`mkdir ${absPath}/${repoName}/build_history`);

  // the git clone and mkdir automatically will check for a named repo

  return next();

  // can add in an error handler that will throw a message if the directory clone already exists
  },

}