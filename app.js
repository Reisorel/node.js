// On récupère le paquet express dans le code
// require va indiquer à Node d'aller chercher la dépendance express dans le dossier nodemodule
const express = require('express')


// Création de l'instance de l'application express.
// Petit seveur web sur lequel va fonctionner notre app
const app = express()
const port = 3000


// Premier homepoint
app.get('/', (req,res) => res.send('Hello Express babudu babidi!🏄'))
app.get('/api/pokemons/1', (req,res) => res.send('Hello, Bulbizarre !'))
// le slahs = route par défault
// req = request
// res = réponse

// Démarrage de l'API rest sur le port 3000
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`))
// Nodemon permet de relancer express en arrière-plan pour prendre en compte les modifications au fur et à mesure.


//Point de terminaison Express = app.METHOD(CHEMIN, GESTIONNAIRE(req, res))
// (GET, POST, PUT, PATCH, DELETE )
