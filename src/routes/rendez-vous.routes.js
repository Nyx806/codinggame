const express = require('express');
const router = express.Router();
const rendezVousController = require('../controllers/rendez-vous.controller');
const { body } = require('express-validator');

// Validation middleware
const validateRendezVous = [
  body('date').isISO8601().withMessage('Date invalide'),
  body('animal').isMongoId().withMessage('ID d\'animal invalide'),
  body('veterinaire').isMongoId().withMessage('ID de vétérinaire invalide'),
  body('motif').notEmpty().withMessage('Le motif est requis'),
  body('statut').optional().isIn(['en attente', 'confirmé', 'annulé']).withMessage('Statut invalide')
];

// Routes
router.get('/', rendezVousController.getAllRendezVous);
router.get('/:id', rendezVousController.getRendezVousById);
router.post('/', validateRendezVous, rendezVousController.createRendezVous);
router.put('/:id', validateRendezVous, rendezVousController.updateRendezVous);
router.delete('/:id', rendezVousController.deleteRendezVous);

module.exports = router; 