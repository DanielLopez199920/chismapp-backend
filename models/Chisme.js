// models/Chisme.js
const mongoose = require("mongoose");

const chismeSchema = new mongoose.Schema({
  contenido: String,
  alias: String,
  zona: String,
  userId: String,
  etiqueta: String,
  fecha: {
    type: Date,
    default: Date.now
  },
  comentarios: [String],
  reacciones: [
    {
      userId: String,
      tipo: String
    }
  ],
  reportes: [String] // 👈 Aquí se almacenan los IDs de usuarios que reportaron
});

module.exports = mongoose.model("Chisme", chismeSchema);
