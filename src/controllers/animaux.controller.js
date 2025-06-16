const Animal = require('../models/animal.model');

/**
 * @swagger
 * /api/animaux:
 *   get:
 *     summary: Récupère la liste de tous les animaux
 *     responses:
 *       200:
 *         description: Liste des animaux récupérée avec succès
 */
exports.getAllAnimaux = async (req, res) => {
  try {
    const animaux = await Animal.find().populate('proprietaire', 'nom prenom');
    res.status(200).json(animaux);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/animaux/{id}:
 *   get:
 *     summary: Récupère un animal par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.getAnimalById = async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('proprietaire', 'nom prenom');
    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/animaux:
 *   post:
 *     summary: Crée un nouvel animal
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - espece
 *               - race
 *               - age
 *               - proprietaire
 */
exports.createAnimal = async (req, res) => {
  try {
    const animal = new Animal(req.body);
    const savedAnimal = await animal.save();
    res.status(201).json(savedAnimal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/animaux/{id}:
 *   put:
 *     summary: Met à jour un animal existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.updateAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/animaux/{id}:
 *   delete:
 *     summary: Supprime un animal
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.deleteAnimal = async (req, res) => {
  try {
    const animal = await Animal.findByIdAndDelete(req.params.id);
    if (!animal) {
      return res.status(404).json({ message: 'Animal non trouvé' });
    }
    res.status(200).json({ message: 'Animal supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 