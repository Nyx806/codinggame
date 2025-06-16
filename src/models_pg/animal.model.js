const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Animal = sequelize.define('Animal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Le nom de l\'animal est requis' },
      },
    },
    espece: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'L\'espèce de l\'animal est requise' },
      },
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La race de l\'animal est requise' },
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'L\'âge de l\'animal est requis' },
        isInt: { msg: 'L\'âge doit être un nombre entier' },
        min: { args: [0], msg: 'L\'âge ne peut pas être négatif' },
      },
    },
    proprietaire_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Proprietaires',
        key: 'id',
      },
      validate: {
        notEmpty: { msg: 'Le propriétaire est requis' },
      },
    },
  }, {
    tableName: 'animaux', // Nom de la table dans la base de données
    indexes: [
      { fields: ['nom', 'espece'] },
      { fields: ['proprietaire_id'] },
    ],
  });

  return Animal;
}; 