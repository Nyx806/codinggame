const express = require('express');
const router = express.Router();
const animauxController = require('../controllers/animaux.controller');
const { body } = require('express-validator');

// Validation middleware
const validateAnimal = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('espece').notEmpty().withMessage('L\'espèce est requise'),
  body('race').notEmpty().withMessage('La race est requise'),
  body('age').isNumeric().withMessage('L\'âge doit être un nombre'),
  body('proprietaire').isMongoId().withMessage('ID de propriétaire invalide')
];

// Routes
router.get('/', animauxController.getAllAnimaux);
router.get('/:id', animauxController.getAnimalById);
router.post('/', validateAnimal, animauxController.createAnimal);
router.put('/:id', validateAnimal, animauxController.updateAnimal);
router.delete('/:id', animauxController.deleteAnimal);

module.exports = router; 