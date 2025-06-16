const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    logging: false, // Désactiver les logs SQL pour plus de clarté
    define: {
      timestamps: true, // Active les champs createdAt et updatedAt
      underscored: true, // Utilise snake_case pour les noms de colonnes (ex: created_at)
    },
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Animal = require('../models_pg/animal.model')(sequelize, Sequelize);
db.Proprietaire = require('../models_pg/proprietaire.model')(sequelize, Sequelize);
db.RendezVous = require('../models_pg/rendez-vous.model')(sequelize, Sequelize);
db.Veterinaire = require('../models_pg/veterinaire.model')(sequelize, Sequelize);

// Définition des relations

db.Proprietaire.hasMany(db.Animal, {
  foreignKey: 'proprietaire_id',
  as: 'animaux',
  onDelete: 'CASCADE',
});
db.Animal.belongsTo(db.Proprietaire, {
  foreignKey: 'proprietaire_id',
  as: 'proprietaire',
});

db.Animal.hasMany(db.RendezVous, {
  foreignKey: 'animal_id',
  as: 'rendezVous',
  onDelete: 'CASCADE',
});
db.RendezVous.belongsTo(db.Animal, {
  foreignKey: 'animal_id',
  as: 'animal',
});

db.Veterinaire.hasMany(db.RendezVous, {
  foreignKey: 'veterinaire_id',
  as: 'rendezVous',
  onDelete: 'SET NULL', // Ou CASCADE si on veut supprimer les rdv du vétérinaire supprimé
});
db.RendezVous.belongsTo(db.Veterinaire, {
  foreignKey: 'veterinaire_id',
  as: 'veterinaire',
});

module.exports = db; 