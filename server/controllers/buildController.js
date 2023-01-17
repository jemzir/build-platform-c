const shell = require('shelljs'); // for the buildCopyClean
const fs = require('fs');
const path = require('path');

module.exports = {
  // use fs for traversal of the git repo for reading/writing --> look for the git-repo
  // can add in ability to search for particular repo and then do the shit

  // **** any failed builds should be put into a version_numberX-f dir in build_history

  dependencyCheck: (req, res, next) => {
    // make all is not throwing an error

    // would also include in similar logic for make clean as well.. 
    try {
      const { repoName } = req.body;
      let result = {repoName: repoName};
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

  buildCopyClean: async (req, res, next) => {
    // run the make, fs copy everything into a version_number dir and then clean it
      // the repo should have a dir called build_history... in there make the version_number dir
      // make a complete copy of everything into that version_numberX-s folder
      const { repoName } = req.body;

      const absPath = path.resolve(__dirname, `../../git-repos/${repoName}/build_history`);

      shell.cd(absPath);
      await fs.readdir(absPath, async (err, files) => {
        let version_num = files.length;
        res.locals.result.v_num = version_num;
        await console.log('version_num', version_num);
        shell.exec(`mkdir version_num_${version_num}`)
        shell.exec(`cp ${absPath}/../* version_num_${version_num}`)
        shell.cd('../');
        shell.exec('make clean');
      })
      
      return next();
  },

  versionTracker: (req, res, next) => {
    // add to a textpage -- shortcut I would instead set up a database here
    console.log(res.locals.result);
      // fs write to the database dbBuildfile... 

    const content = JSON.stringify(res.locals.result) + '\n';
    fs.appendFile(path.resolve(__dirname, '../../views/dbBuildHistoryStatus.txt'), content, err => {
      if (err) {
        console.error(err);
      }
    });
    return next();
  }
}