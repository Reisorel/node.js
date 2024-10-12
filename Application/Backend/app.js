// Impore cors
const cors = require("cors");
// Initialise le serveur Express
const express = require("express");
// Importe middleware Morgan
const morgan = require("morgan");
// Importe la favicon
const favicon = require("serve-favicon");
// Importe le middleware body parser
const bodyParser = require("body-parser");
// Importe sequelize
const sequelize = require('./src/db/sequelize')
// Petit seveur web sur lequel va fonctionner notre app
const app = express();
// Définit le port sur lequel le serveur va écouter
const port = 5000;
// Appelle cors
app.use(cors());


app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json());

  sequelize.initDb()

  // Ici nous placerons nos futurs endpoints
 require('./src/routes/findAllPokemons')(app)
 require('./src/routes/findPokemonByPk')(app)
 require('./src/routes/createPokemon')(app)
 require('./src/routes/updatePokemon')(app)
 require('./src/routes/deletePokemon')(app)

 // On ajoute la gestion des erreurs :
 app.use(({res}) => {
  const message = "Impossible de trouver la ressource demandée 🤨"
  res.status(404).json(message)
 })

// Démarrage de l'API rest sur le port 3000
app.listen(port, () =>
  console.log(
    `Notre application Node est démarrée sur http://localhost:${port}`
  )
);
app.get("*", (req, res) => res.send("Hello again Express! 🏄🏻‍♂️"));



// Codes HTTP :

// 1xx : Information
// 2xx : Succès (200, 201)
// 3xx : Redirection (301, 201). Ressource déplacée.
// 4xx : Erreur client (400, 401, 404). Erreur client.
// 5xx : Erreur serveur (500, 503). Erreur serveur
