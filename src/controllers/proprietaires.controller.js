const Proprietaire = require('../models/proprietaire.model');

/**
 * @swagger
 * /api/proprietaires:
 *   get:
 *     summary: Récupère la liste de tous les propriétaires
 *     responses:
 *       200:
 *         description: Liste des propriétaires récupérée avec succès
 */
exports.getAllProprietaires = async (req, res) => {
  try {
    const proprietaires = await Proprietaire.find();
    res.status(200).json(proprietaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/proprietaires/{id}:
 *   get:
 *     summary: Récupère un propriétaire par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.getProprietaireById = async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findById(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }
    res.status(200).json(proprietaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/proprietaires:
 *   post:
 *     summary: Crée un nouveau propriétaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - email
 *               - telephone
 *               - adresse
 */
exports.createProprietaire = async (req, res) => {
  try {
    const proprietaire = new Proprietaire(req.body);
    const savedProprietaire = await proprietaire.save();
    res.status(201).json(savedProprietaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/proprietaires/{id}:
 *   put:
 *     summary: Met à jour un propriétaire existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.updateProprietaire = async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }
    res.status(200).json(proprietaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/proprietaires/{id}:
 *   delete:
 *     summary: Supprime un propriétaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.deleteProprietaire = async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findByIdAndDelete(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ message: 'Propriétaire non trouvé' });
    }
    res.status(200).json({ message: 'Propriétaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 