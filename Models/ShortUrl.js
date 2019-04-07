//creation de schema
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const shortUrl = new Schema({
  originalUrl: {
    type: String,
    required: true,
    maxlength: 200,
    lowercase: true,
    trim: true
  },
  shortUrl: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 5
  },
  visitCounter: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: new Date().toUTCString()
  }
});

const ShortUrl = mongoose.model("ShortUrl", shortUrl);

module.exports = ShortUrl;
