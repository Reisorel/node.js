// On récupère le paquet express dans le code
// require va indiquer à Node d'aller chercher la dépendance express dans le dossier nodemodule
const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const { success, getUniqueId } = require('./helper.js')
let pokemons = require('./mock-pokemon')

// Création de l'instance de l'application express.
// Petit seveur web sur lequel va fonctionner notre app
const app = express()
const port = 3000

// Accès aux middleware
app
.use(favicon(__dirname + '/favicon.ico'))
.use(morgan('dev'))
.use(bodyParser.json())

// Premier homepoint
app.get('/', (req,res) => res.send('Hello Express🏄'))
app.get('/api/pokemons/:id', (req,res) => {
// Express va récupérer le paramètre  et le tansmettre dans le endpoint via l'objet req
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokémon a bien été trouvé'
  res.json(success(message, pokemon))
})

app.get('/api/pokemons', (req, res) => {
  const messageGlobal = "Voici la liste des pokémons"
  res.json(success(messageGlobal, pokemons))
})

app.post('/api/pokemons', (req, res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = {...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokemon ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

// app.put('/api/pokemons:id', (req, res) => {
//    const id = parseInt(req.params.id)
//    const pokemonUpdated = { ...req.body, id: id}
//    pokemons = pokemons.map(pokemon => {
//     return pokemon.id === id ? pokemonUpdated : pokemon
//    })
//    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
//    res.json(success(message, pokemonUpdated))
// })
app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id }
  pokemons = pokemons.map(pokemon => {
   return pokemon.id === id ? pokemonUpdated : pokemon
  })

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
  res.json(success(message, pokemonUpdated))
 });

// le slash = route par défault
// req = request
// res = réponse

// Démarrage de l'API rest sur le port 3000
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))
// Nodemon permet de relancer express en arrière-plan pour prendre en compte les modifications au fur et à mesure.
