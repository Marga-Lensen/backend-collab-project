## backend collaboration project - Bewerbung Management App
April, 30 - May, 7 2025 

### Day 1

- setting up GitHub 
- - new repo w collaborators
- - new project w tasks & assignments

- setting up local folders; start by cloning

- work w branches to push and then MERGE on GitHub

#
#### start programming

- start w backend 

- run script to create all necessary folders, files and packages, incl.

- - package.json w express, mongoose, cors, dotenv
- - server.js
- - utils/connectDB.js
- - .env
- - .gitignore

#
#### discuss and plan the setup

- **design** the mongoose Schema : *models/BewerbungSchema.js*

- **create** *data/startData.json*   // dummy set of 5 objects
- **run** *seed.js* to enter the data.json into MongoDB
- check Compass / Atlas Cloud for the database and collection
- check the GET API endpoint '[localhost:5000/bewerbungen](http:localhost:5000/bewerbungen)'

#
### Day 2

- program the frontend
- - **html onepager** w embedded ```<style>``` and ```<script>```

I. show bewerbungs from MongoDB in html ```<table>```

- html head (end)   ```<style>```
- html body (middle)```<table>```
- html body (end)   ```<script>```

II. enter new Bewerbung with html ```<form>```

- html head (end)   ```<style>```
- html body (middle)```<form>```
- html body (end)   ```<script>```

#
❕API endpoint different for different people... 

=> config.js with API_BASE_URL

```javascript
const API_BASE_URL = "http://localhost:5000"; 
```

=> await fetch('')

```javascript
    const response = await fetch(`${API_BASE_URL}/bewerbungen`, {})
```
#

### Day 3 

- styling of table and forms
- matching input (form) & output (table) with Schema (database)
- folder structure organisation
- README w
- - screenshots
- - project details
- - planning & documentation
- - links to contributors' profiles