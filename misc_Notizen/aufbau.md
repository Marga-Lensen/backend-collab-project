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

neben den Ordnern
- utils
- node_modules

### neue Ordner anlegen
#
- data
- - startData.json

#
- models

❕- - BewerbungSchema.js // mongoose Schema 

#
- controllers ..... später
#
- routers   .... später


### neue Dateien anlegen:

- - seed.js  // script neben server.js im root


## nächster großer Schritt: frontend dran hängen

-👉️ simple html.

+ Fokussierung liegt auf Backend

+ Beispielprojekt Handy (Mansour) war auch einfaches html;
(und zwar repo16 - pagination - 11 März - backend lesson 16)
in project: indexMansourHandy.html

❕```<style>``` in html "onepager"
❕```<script>``` in html "onepager"


#
NICHT react + vite
- - relativ aufwändig und es geht hier ja um das backend vornämlich...

- - immer neustarten mit npm run dev und dann ist localhost: 5173 besetzt

## Aufgabenverteilung

### backend

-✔️ models/BewerbungSchema.js
-✔️ data.json
-✔️ seed.js

### frontend 

### I. Wiedergabe von Bewerbungen aus MongoDB

-✔️ index.html
-✔️ - ```<style>```
-✔️ - ```<script>```


### II. Eintragen von Bewerbungen in MongoDB

- index.html
- - ```<style>```
- - ```<script>```

<!--<button>ich bin ein button</button>-->