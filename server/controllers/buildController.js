module.exports = {
  // use fs for traversal of the git repo for reading/writing --> look for the git-repo
  // can add in ability to search for particular repo and then do the shit

  dependencyCheck: (req, res, next) => {
    // dependencies all exist, all exists and clean exists
  },

  orderCheck: (req, res, next) => {
    // dependencies are in good order
  },

  buildCopyClean: (req, res, next) => {
    // run the make, fs copy everything into a version_number and then clean it
  }
}