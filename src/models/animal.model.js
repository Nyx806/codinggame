const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom de l\'animal est requis'],
    trim: true
  },
  espece: {
    type: String,
    required: [true, 'L\'espèce de l\'animal est requise'],
    trim: true
  },
  race: {
    type: String,
    required: [true, 'La race de l\'animal est requise'],
    trim: true
  },
  age: {
    type: Number,
    required: [true, 'L\'âge de l\'animal est requis'],
    min: [0, 'L\'âge ne peut pas être négatif']
  },
  proprietaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Proprietaire',
    required: [true, 'Le propriétaire est requis']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Animal', animalSchema);