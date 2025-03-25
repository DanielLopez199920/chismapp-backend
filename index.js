// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chismesRoutes = require("./routes/chismesRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chismes", chismesRoutes);

// Conexión a MongoDB (usando variable de entorno)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor backend en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB", err.message);
  });
