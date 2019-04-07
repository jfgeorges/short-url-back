const express = require("express");
const router = express.Router();
const ShortUrl = require("../Models/ShortUrl.js");
const randomGen = require("../tools/randomGen");

// CONSTANTE
const serverPath = "http://localhost:3000/";

// FONCTIONS
// Vérification si la chaine générée existe déjà en base
const shortIdExists = async shortId => {
  const shortUrl = await ShortUrl.findOne({
    shortUrl: shortId
  });
  return shortUrl ? true : false;
};
// CRUD
// CREATE a ShortUrl
router.post("/shortenUrl", async (req, res) => {
  if (req.body.originalUrl) {
    try {
      const originalUrl = await ShortUrl.findOne({
        originalUrl: req.body.originalUrl
      });
      if (originalUrl) {
        return res.status(400).json({
          error: {
            message: "This Url already exists",
            code: 100
          }
        });
      }
      // Génération de la chaine aléatoire
      let shortId = randomGen(5);

      // Boucle jusqu'à l'obtention d'un shortId disponible
      while ((await shortIdExists(shortId)) === true) {
        shortId = randomGen(5);
      }

      // Enregistrement de la nouvelle adresse
      const newShortUrl = new ShortUrl({
        originalUrl: req.body.originalUrl,
        shortUrl: shortId
      });

      await newShortUrl.save();

      const shortUrlList = await ShortUrl.find();

      return res.status(200).json({ serverPath, shortUrlList });
    } catch (error) {
      return res.status(400).json({
        error: {
          message: error.message,
          code: 110
        }
      });
    }
  }
  return res.status(400).json({
    error: {
      message: "shortenUrl: req.body.originalUrl not found",
      code: 110
    }
  });
});

// READ the ShortUrls list
router.get("/", async (req, res) => {
  try {
    const shortUrlList = await ShortUrl.find();
    return res.status(200).json({ serverPath, shortUrlList });
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Read all ShortUrls: " + error.message,
        code: 120
      }
    });
  }
});

// READ a specific ShortUrls
router.get("/:shortUrlId", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrlId });
    if (shortUrl) {
      // Update the visitCounter
      shortUrl.visitCounter = shortUrl.visitCounter + 1;
      await shortUrl.save();
      return res.redirect(shortUrl.originalUrl);
    }
    return res.status(400).json({
      error: {
        message: `Read a ShortUrl: ${req.params.shortUrlId} not found`,
        code: 130
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Read a ShortUrl: " + error.message,
        code: 130
      }
    });
  }
});

// UPDATE counter
router.post("/updatecounter", async (req, res) => {
  try {
    if (req.body.shortUrl) {
      const shortUrl = await ShortUrl.findOne({ shortUrl: req.body.shortUrl });
      if (shortUrl) {
        shortUrl.visitCounter = shortUrl.visitCounter + 1;
        await shortUrl.save();
        const shortUrlList = await ShortUrl.find();
        return res.status(200).json({ serverPath, shortUrlList });
      }
    }
    return res.status(400).json({
      error: {
        message: `Update Counter: shortUrl ${req.body.shortUrl} not found`,
        code: 140
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: {
        message: "Update Counter: " + error.message,
        code: 150
      }
    });
  }
});

module.exports = router;
