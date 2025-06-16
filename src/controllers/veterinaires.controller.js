const Veterinaire = require('../models/veterinaire.model');

/**
 * @swagger
 * /api/veterinaires:
 *   get:
 *     summary: Récupère la liste de tous les vétérinaires
 *     responses:
 *       200:
 *         description: Liste des vétérinaires récupérée avec succès
 */
exports.getAllVeterinaires = async (req, res) => {
  try {
    const veterinaires = await Veterinaire.find();
    res.status(200).json(veterinaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/veterinaires/{id}:
 *   get:
 *     summary: Récupère un vétérinaire par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.getVeterinaireById = async (req, res) => {
  try {
    const veterinaire = await Veterinaire.findById(req.params.id);
    if (!veterinaire) {
      return res.status(404).json({ message: 'Vétérinaire non trouvé' });
    }
    res.status(200).json(veterinaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/veterinaires:
 *   post:
 *     summary: Crée un nouveau vétérinaire
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - prenom
 *               - specialite
 *               - email
 *               - telephone
 */
exports.createVeterinaire = async (req, res) => {
  try {
    const veterinaire = new Veterinaire(req.body);
    const savedVeterinaire = await veterinaire.save();
    res.status(201).json(savedVeterinaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/veterinaires/{id}:
 *   put:
 *     summary: Met à jour un vétérinaire existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.updateVeterinaire = async (req, res) => {
  try {
    const veterinaire = await Veterinaire.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!veterinaire) {
      return res.status(404).json({ message: 'Vétérinaire non trouvé' });
    }
    res.status(200).json(veterinaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/veterinaires/{id}:
 *   delete:
 *     summary: Supprime un vétérinaire
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.deleteVeterinaire = async (req, res) => {
  try {
    const veterinaire = await Veterinaire.findByIdAndDelete(req.params.id);
    if (!veterinaire) {
      return res.status(404).json({ message: 'Vétérinaire non trouvé' });
    }
    res.status(200).json({ message: 'Vétérinaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 