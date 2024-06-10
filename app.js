// Initialise le serveur Express
const express = require('express')
// Initialise le middleware Morgan pour l'affichage des logs des requêtes HTTP
const morgan = require('morgan')
// Initialise la favicon
const favicon = require('serve-favicon')
// Initialise une extension middleware pour analyser le corps des requêtes HTTP au format JSON
const bodyParser = require('body-parser')
// Initialise les classes Sequelize et DataTypes en utilisant le destructuring pour extraire directement ces classes de l'objet exporté par le module 'sequelize'.
const sequelize = require('./src/db/sequelize')

// Création de l'instance de l'application express.
// Petit seveur web sur lequel va fonctionner notre app
const app = express()
const port = 3000

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  // Middleware pour parser les réponses json
  .use(bodyParser.json())

sequelize.initDb()
// Ici futurs endpoints

// Démarrage de l'API rest sur le port 3000
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))
// Nodemon permet de relancer express en arrière-plan pour prendre en compte les modifications au fur et à mesure.
