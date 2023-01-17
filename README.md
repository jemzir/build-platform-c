# build-platform-c

A simple build platform for C applications

Steps: 
  
  -- **Prerequisite** --
  
  **need to have nodejs installed to wherever environment you are running this**
  
  1. Clone the build-platform-c repository 

        a. in the terminal at the root of the repository: run ```npm i```

        b. to start the server: run ```npm run start-dev```

  2. To register repository:
    send a POST request to 'http://localhost:5000/api' 
     containing body of 
     
        ```{ repo: <path/to/repo or URL> , repoName: "repositoryExampleName"}```

  3. To see the website, launch 'http://localhost:5000/' on the browser

Note: It should automatically run a scheduled job every 15 seconds of grabbing the latest commits and versions. 

