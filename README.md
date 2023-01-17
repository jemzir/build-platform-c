# build-platform-c

A simple build platform for C applications

Steps: 

1. Clone the build-platform-c repository **need to have nodejs installed to wherever environment you are running this**
  a. in the terminal at the root of the repository: run "npm i"
  b. to start the server: run "npm run start-dev"
2. cd into the git-repos folder
3. To register repository:
  send a POST request to 'http://localhost:5000/api' containing body of { repo: *<path/to/repo or URL>* , repoName: "repositoryExampleName"}
  (need to do this because there are automatic scripts that make a used build_history directory for later usage)
4. To see the website, launch 'http://localhost:5000/' on the browser

Note: It should automatically run a scheduled job every 15 seconds of grabbing the latest commits and versions. 

