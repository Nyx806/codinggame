const express = require('express');
const router = express.Router();
const proprietairesController = require('../controllers/proprietaires.controller');
const { body } = require('express-validator');

// Validation middleware
const validateProprietaire = [
  body('nom').notEmpty().withMessage('Le nom est requis'),
  body('prenom').notEmpty().withMessage('Le prénom est requis'),
  body('email').isEmail().withMessage('Email invalide'),
  body('telephone').matches(/^[0-9]{10}$/).withMessage('Numéro de téléphone invalide'),
  body('adresse').notEmpty().withMessage('L\'adresse est requise')
];

// Routes
router.get('/', proprietairesController.getAllProprietaires);
router.get('/:id', proprietairesController.getProprietaireById);
router.post('/', validateProprietaire, proprietairesController.createProprietaire);
router.put('/:id', validateProprietaire, proprietairesController.updateProprietaire);
router.delete('/:id', proprietairesController.deleteProprietaire);

module.exports = router; 