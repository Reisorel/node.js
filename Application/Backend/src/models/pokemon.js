const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris",
        },
        validate: {
          notEmpty: { msg: "Le champ ne peut être vide" },
          notNull: { msg: "Le nom est une propriété requise" },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: { msg: "Utilisez uniquement les nombres entiers pour les PV" },
          notNull: { msg: "Les PV sont une propriété requise" },
          min: {
            args: [0],
            msg: "Le nombre de PV doit être égal ou supérieur à 0",
          },
          max: {
            args: [999],
            msg: "Le nombre de PV doit être inférieur ou égal à 999",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement les nombres entiers pour les points de dégâts",
          },
          notNull: { msg: "Les CP sont une propriété requise" },
          min: {
            args: [0],
            msg: "Les points d'attaque doivent être supérieurs à 0",
          },
          max: {
            args: [99],
            msg: "Les points d'attaque doivent être inférieurs ou égaux à 99",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: "Utilisez uniquement des URL valides pour les images" },
          notNull: { msg: "Les images sont une propriété requise" },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(",");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypeValid(value) {
            if (!value) {
              throw new Error("Un pokémon doit au moins avoir un type");
            }
            if (value.split(",").length > 3) {
              throw new Error("Un Pokémon ne peut avoir plus de 3 types");
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type du pokémon doit apparaître dans la liste suivante: ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
