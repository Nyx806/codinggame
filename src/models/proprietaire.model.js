const mongoose = require('mongoose');

const proprietaireSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est requis'],
    trim: true
  },
  prenom: {
    type: String,
    required: [true, 'Le prénom est requis'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est requis'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez fournir un email valide']
  },
  telephone: {
    type: String,
    required: [true, 'Le numéro de téléphone est requis'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Veuillez fournir un numéro de téléphone valide']
  },
  adresse: {
    type: String,
    required: [true, 'L\'adresse est requise'],
    trim: true
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des recherches
proprietaireSchema.index({ email: 1 });
proprietaireSchema.index({ nom: 1, prenom: 1 });

module.exports = mongoose.model('Proprietaire', proprietaireSchema); 