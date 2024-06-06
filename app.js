// On récupère le paquet express dans le code
// require va indiquer à Node d'aller chercher la dépendance express dans le dossier nodemodule
const express = require('express')
// Require lemiddleware morgan
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
// J'utilise le destructuring pour aller chercher la classe sequelize directement de l'objet exporté par le module
const { Sequelize } = require('sequelize')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

// Création de l'instance de l'application express.
// Petit seveur web sur lequel va fonctionner notre app
const app = express()
const port = 3000

// Instance de Sequelize configure et établit la connexion avec la BDD
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

sequelize.authenticate()
  .then(_=> console.log('La connexion à la base de données a bien été établie'))
  .catch(error => console.log(`Impossible de se connecter à la base de donnés ${error}`));

// Accès aux middleware
app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
// Middleware pour parser les réponses json
.use(bodyParser.json())

// Premier homepoint
app.get('/', (req,res) => res.send('Hello Express🏄'))
app.get('/api/pokemons/:id', (req,res) => {
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
  const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
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
