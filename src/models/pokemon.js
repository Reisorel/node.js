/* L’API Rest et la Base de données : Créer un modèle Sequelize */

// Paramètre sequelize représente la connexion à la BDD. Propriété define permet de déclarer nouveaux modèles.
// DataTypes : type de donnée de chaque propriété
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokémon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
