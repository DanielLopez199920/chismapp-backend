// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const chismesRoutes = require("./routes/chismesRoutes");

app.use(cors());
app.use(express.json());

app.use("/api/chismes", chismesRoutes); // <--- ESTE PREFIJO DEBE COINCIDIR

mongoose.connect("mongodb://localhost:27017/chismapp")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(5000, () => console.log("Servidor backend en puerto 5000"));
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err.message);
  });
