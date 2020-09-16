# ResumeIt-chrome

This is small project I created few months back this repository is part of the project which contains the chrome extention needed. Idea is to let user carry on their task(browsing the web or playing video) they are doing in their chrome browser and resume it on their android devices in just a click.

You can either build the project from scratch or simply download the extention from chrome webstore.

# Chrome Webstore

https://chrome.google.com/webstore/detail/resumeit/fpgoaioabjkgnoaiofegpdicobmpifhc

# Build from scratch

How to build:

1. Insert your credentials into src/js/firebaseConfig.js file
2. Run 'npm run build' command to build 
3. run 'npm run webby' command to create single js file (main.js) for project in dist folder.
4. Now in dist folder inside index.html replace script path from main.$.js -> main.js
4. Open chrome, Make sure you have developer option on.
5. Import the dist folder in chrome as an extention  
