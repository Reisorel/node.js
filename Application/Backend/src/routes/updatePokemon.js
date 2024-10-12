const { ValidationError } = require("sequelize");
const { Pokemon } = require("../db/sequelize");
const { response } = require("express");

module.exports = (app) => {
  app.put("/api/pokemons/:id", (req, res) => {
    const id = req.params.id;

    // Met à jour le Pokémon en fonction de l'ID
    Pokemon.update(req.body, {
      where: { id: id },
    })
      .then(() => {
        // Recherchez le Pokémon mis à jour par son ID
        return Pokemon.findByPk(id).then((pokemon) => {
          if (!pokemon) {
            const message = `Le pokémon avec l'ID ${id} n'a pas pu être trouvé.`;
            return res.status(404).json({ message });
          }
          const message = `Le pokémon ${pokemon.name} a bien été modifié.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le pokémon n'a pas pu être modifié en raison d'une erreur.`;
        res.status(500).json({ message, error });
      });
  });
};
