const mongoose = require('mongoose');
require('dotenv').config();

// Connexion à MongoDB
const connectDB = async () => {
  try {
    // Suppression des options obsolètes
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connexion à MongoDB réussie');
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;