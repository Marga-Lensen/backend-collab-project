## Vorbereitung

- npm init -y
- npm i readline-sync
- npm i

- package.json: "type": "module"

=> script ausführen mit node.js

    node scriptXYZ.js

--> dann kommen 3 Abfragen mit rls:

argvs[2]: project name ; default: newProject
argvs[3] : PORT ; default : 3000
argvs[4] : CONNECTION_STRING f mongoDB ; default: localhost: 27017/DBname



## was haben wir nach Ausführen vom Script

- newProject Ordner

- server.js

- .env  mit den obigen Angaben ⤴️
- .gitignore

- package.json mit "type": "module"
und packages:
(npm i cors dotenv express mongoose: im SCRIPT bereits ausgeführt!)
- - dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "mongoose": "^8.14.1"
  }

- node_modules

- utils/  Ordner
- - utils/connectDB.js

#


## wechseln zum neuen Ordner

- node server.js
❕ npm run start ist gleichwürdig ; kurz: 

  npm start

(in package.json:
  "scripts": {
    "start": "node server.js"
  },)


## nächster Schritt

- neben den Ordnern
- - utils
- - node_moduls

### neue Ordner anlegen

- data
- - startData.json
(- - seedData.js  script hier(oder neben server.js im root?))

- models
❕- - BewerbungSchema.js mongoose Schema 

- controllers ..... später
- routers   .... später


## nächster großer Schritt: frontend dran hängen

- simple html
- react + vite