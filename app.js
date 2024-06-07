// Initialise le serveur Express
const express = require('express')
// Initialise le middleware Morgan pour l'affichage des logs des requêtes HTTP
const morgan = require('morgan')
// Initialise la favicon
const favicon = require('serve-favicon')
// Initialise une extension middleware pour analyser le corps des requêtes HTTP au format JSON
const bodyParser = require('body-parser')
// Initialise les classes Sequelize et DataTypes en utilisant le destructuring pour extraire directement ces classes de l'objet exporté par le module 'sequelize'.
const { Sequelize, DataTypes } = require('sequelize')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')
const PokemonModel = require('./src/models/pokemon')

// Création de l'instance de l'application express.
// Petit seveur web sur lequel va fonctionner notre app
const app = express()
const port = 3000

// Configure une instance de Sequelize pour la connexion à la base de données 'pokedex' en utilisant MariaDB
const sequelize = new Sequelize(
  'pokedex',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2'
    },
    logging: false
  }
)

// Test connexion avec la BDD
sequelize.authenticate()
  .then(_ => console.log('La connexion à la base de données a bien été établie'))
  .catch(error => console.log(`Impossible de se connecter à la base de donnés ${error}`));

// Définition du modèle
const Pokemon = PokemonModel(sequelize, DataTypes)

sequelize.sync({ force: true })
  .then(_ => {
    console.log('La base de données "Pokédex" a bien été mise à jour')

    Pokemon.create({
      name: 'Bulbizzare',
      hp: 25,
      cp: 5,
      picture: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
      types: ["Plante", "Poison"].join()
    }).then(bulbizzare => console.log(bulbizzare.toJSON()))
  })
// Accès aux middleware
app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  // Middleware pour parser les réponses json
  .use(bodyParser.json())

// Premier endpoint
app.get('/', (req, res) => res.send('Hello Express🏄'))
app.get('/api/pokemons/:id', (req, res) => {
  // Express va récupérer le paramètre  et le tansmettre dans le endpoint via l'objet req
  const id = parseInt(req.params.id)
  // On vérifie si le pokémon existe en comparant son id à ceux existants
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokémon a bien été trouvé'
  res.json(success(message, pokemon))
})

// Route pour avoir l'ensemble des données avec GET
app.get('/api/pokemons', (req, res) => {
  const messageGlobal = "Voici la liste des pokémons"
  res.json(success(messageGlobal, pokemons))
})

// Route pour poster un nouveau pokémon POST
app.post('/api/pokemons', (req, res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } }
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

// Route pour modifier un pokémon PUT
app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id }
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
  res.json(success(message, pokemonUpdated))
})

// Route pour supprimer un pokémon DELETE
app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
});

// le slash = route par défault
// req = requeste
// res = réponse

// Démarrage de l'API rest sur le port 3000
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))
// Nodemon permet de relancer express en arrière-plan pour prendre en compte les modifications au fur et à mesure.
