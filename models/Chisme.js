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

  // 👇 Cambia esto correctamente:
  reacciones: [
    {
      userId: String,
      tipo: String
    }
  ]
});

module.exports = mongoose.model("Chisme", chismeSchema);
