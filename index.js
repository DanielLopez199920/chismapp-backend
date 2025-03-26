const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const chismesRoutes = require("./routes/chismesRoutes");
const { Server } = require("socket.io");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // puedes filtrar después para más seguridad
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io; // para acceder desde los controladores
  next();
});

app.use("/api/chismes", chismesRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB", err.message);
  });
