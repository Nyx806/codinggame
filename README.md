# API Clinique Vétérinaire

Cette API permet de gérer une clinique vétérinaire avec les fonctionnalités suivantes :
- Gestion des animaux
- Gestion des propriétaires
- Gestion des rendez-vous
- Gestion des vétérinaires

## Prérequis

- Node.js (v14 ou supérieur)
- PostgreSQL
- npm ou yarn

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd vet-clinic-api
```

2. Installer les dépendances :
```bash
npm install
```

3. Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```
PORT=3000
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_pg_username
DB_PASSWORD=your_pg_password
DB_NAME=vet_clinic
```

4. Démarrer le serveur :
```bash
# Mode développement
npm run dev

# Mode production
npm start
```

## Documentation API

L'API sera accessible à l'adresse : `http://localhost:3000`
La documentation Swagger est disponible à l'adresse : `http://localhost:3000/api-docs`

## Structure des données

### Animal
- id: UUID
- nom: String
- espece: String
- race: String
- age: Integer
- proprietaireId: UUID (clé étrangère vers Proprietaire)

### Proprietaire
- id: UUID
- nom: String
- prenom: String
- email: String
- telephone: String
- adresse: String

### RendezVous
- id: UUID
- date: Date
- animalId: UUID (clé étrangère vers Animal)
- veterinaireId: UUID (clé étrangère vers Veterinaire)
- motif: String
- statut: String (en attente, confirmé, annulé)

### Veterinaire
- id: UUID
- nom: String
- prenom: String
- specialite: String
- email: String
- telephone: String

## Endpoints API

### Animaux
- GET /api/animaux - Liste tous les animaux
- GET /api/animaux/:id - Récupère un animal spécifique
- POST /api/animaux - Crée un nouvel animal
- PUT /api/animaux/:id - Met à jour un animal
- DELETE /api/animaux/:id - Supprime un animal

### Propriétaires
- GET /api/proprietaires - Liste tous les propriétaires
- GET /api/proprietaires/:id - Récupère un propriétaire spécifique
- POST /api/proprietaires - Crée un nouveau propriétaire
- PUT /api/proprietaires/:id - Met à jour un propriétaire
- DELETE /api/proprietaires/:id - Supprime un propriétaire

### Rendez-vous
- GET /api/rendez-vous - Liste tous les rendez-vous
- GET /api/rendez-vous/:id - Récupère un rendez-vous spécifique
- POST /api/rendez-vous - Crée un nouveau rendez-vous
- PUT /api/rendez-vous/:id - Met à jour un rendez-vous
- DELETE /api/rendez-vous/:id - Supprime un rendez-vous

### Vétérinaires
- GET /api/veterinaires - Liste tous les vétérinaires
- GET /api/veterinaires/:id - Récupère un vétérinaire spécifique
- POST /api/veterinaires - Crée un nouveau vétérinaire
- PUT /api/veterinaires/:id - Met à jour un vétérinaire
- DELETE /api/veterinaires/:id - Supprime un vétérinaire 