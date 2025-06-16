const RendezVous = require('../models/rendez-vous.model');

/**
 * @swagger
 * /api/rendez-vous:
 *   get:
 *     summary: Récupère la liste de tous les rendez-vous
 *     responses:
 *       200:
 *         description: Liste des rendez-vous récupérée avec succès
 */
exports.getAllRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.find()
      .populate('animal', 'nom espece')
      .populate('veterinaire', 'nom prenom specialite');
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/rendez-vous/{id}:
 *   get:
 *     summary: Récupère un rendez-vous par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.getRendezVousById = async (req, res) => {
  try {
    const rendezVous = await RendezVous.findById(req.params.id)
      .populate('animal', 'nom espece')
      .populate('veterinaire', 'nom prenom specialite');
    if (!rendezVous) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/rendez-vous:
 *   post:
 *     summary: Crée un nouveau rendez-vous
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - date
 *               - animal
 *               - veterinaire
 *               - motif
 */
exports.createRendezVous = async (req, res) => {
  try {
    const rendezVous = new RendezVous(req.body);
    const savedRendezVous = await rendezVous.save();
    const populatedRendezVous = await RendezVous.findById(savedRendezVous._id)
      .populate('animal', 'nom espece')
      .populate('veterinaire', 'nom prenom specialite');
    res.status(201).json(populatedRendezVous);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/rendez-vous/{id}:
 *   put:
 *     summary: Met à jour un rendez-vous existant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.updateRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('animal', 'nom espece')
     .populate('veterinaire', 'nom prenom specialite');
    
    if (!rendezVous) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.status(200).json(rendezVous);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 * @swagger
 * /api/rendez-vous/{id}:
 *   delete:
 *     summary: Supprime un rendez-vous
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
exports.deleteRendezVous = async (req, res) => {
  try {
    const rendezVous = await RendezVous.findByIdAndDelete(req.params.id);
    if (!rendezVous) {
      return res.status(404).json({ message: 'Rendez-vous non trouvé' });
    }
    res.status(200).json({ message: 'Rendez-vous supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 