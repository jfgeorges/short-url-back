//creation d'un serveur
const express = require("express");
const app = express();

//permet d 'utiliser des bodys
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//permet d'utiliser BD moongoDB
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

//donne accessibilité aux autres sites pour recuperer des infos
const cors = require("cors");
app.use(cors());

// pour eviter que le header client affiche "express". vient combler des failles de securité
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
