const express = require('express');
const router = express.Router();
const veterinairesController = require('../controllers/veterinaires.controller');
const { body } = require('express-validator');

// Validation middleware
const validateVeterinaire = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('specialite').notEmpty().withMessage('La spécialité est requise'),
  body('email').isEmail().withMessage('Email invalide'),
  body('telephone').matches(/^[0-9]{10}$/).withMessage('Numéro de téléphone invalide')
];

// Routes
router.get('/', veterinairesController.getAllVeterinaires);
router.get('/:id', veterinairesController.getVeterinaireById);
router.post('/', validateVeterinaire, veterinairesController.createVeterinaire);
router.put('/:id', validateVeterinaire, veterinairesController.updateVeterinaire);
router.delete('/:id', veterinairesController.deleteVeterinaire);

module.exports = router; 