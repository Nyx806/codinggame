require('dotenv').config();
const express = require('express');
// const mongoose = require('mongoose'); // Supprimer cette ligne
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const connectDB = require('./config/database');

// Import des routes
const animauxRoutes = require('./routes/animaux.routes');
const proprietairesRoutes = require('./routes/proprietaires.routes');
const rendezVousRoutes = require('./routes/rendez-vous.routes');
const veterinairesRoutes = require('./routes/veterinaires.routes');

const app = express();

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Clinique Vétérinaire',
      version: '1.0.0',
      description: 'API pour la gestion d\'une clinique vétérinaire',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/animaux', animauxRoutes);
app.use('/api/proprietaires', proprietairesRoutes);
app.use('/api/rendez-vous', rendezVousRoutes);
app.use('/api/veterinaires', veterinairesRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Une erreur est survenue',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Connexion à la base de données
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});