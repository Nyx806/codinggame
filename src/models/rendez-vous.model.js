const mongoose = require('mongoose');

const rendezVousSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'La date du rendez-vous est requise'],
    validate: {
      validator: function(date) {
        return date > new Date();
      },
      message: 'La date du rendez-vous doit être dans le futur'
    }
  },
  animal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Animal',
    required: [true, 'L\'animal est requis']
  },
  veterinaire: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Veterinaire',
    required: [true, 'Le vétérinaire est requis']
  },
  motif: {
    type: String,
    required: [true, 'Le motif du rendez-vous est requis'],
    trim: true
  },
  statut: {
    type: String,
    enum: ['en attente', 'confirmé', 'annulé'],
    default: 'en attente'
  }
}, {
  timestamps: true
});

// Index pour améliorer les performances des recherches
rendezVousSchema.index({ date: 1 });
rendezVousSchema.index({ animal: 1 });
rendezVousSchema.index({ veterinaire: 1 });
rendezVousSchema.index({ statut: 1 });

module.exports = mongoose.model('RendezVous', rendezVousSchema); 