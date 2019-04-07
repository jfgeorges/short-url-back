// Gestion des variables d'environnements
require("dotenv").config();

// Création du serveur Express
const express = require("express");
const app = express();

// Pour lire le contenu des requêtes body
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Simplifie l'utilisation de MongoDB
const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/short-url",
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) console.error("Could not connect to mongodb.");
  }
);

// Permet aux sites ayant une url différente d'accéder au serveur
const cors = require("cors");
app.use(cors());

// Masque le serveur "express", Comble des failles de securité
const helmet = require("helmet");
app.use(helmet());

// Import des routes
const shortUrl = require("./Routes/shortUrl");

app.use(shortUrl);

// Toutes les méthodes HTTP (GET, POST, etc.) des pages non trouvées afficheront
// une erreur 404
app.all("*", function(req, res) {
  res.status(404).json({ error: { message: "Url not Found", code: 404 } });
});

app.listen(process.env.PORT || 3000, function() {
  console.log(`Short-Url API running on port ${process.env.PORT || 3000}`);
  console.log(`Current environment is ${process.env.NODE_ENV || 3000}`);
});
