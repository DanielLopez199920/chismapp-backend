const express = require("express");
const router = express.Router();
const {
  publicarChisme,
  obtenerChismesPorZona,
  agregarComentario,
  reaccionarChisme,
} = require("../controllers/chismesController");

// ⚠️ RUTAS CORRECTAS Y FUNCIONALES
router.post("/", publicarChisme);
router.get("/zona/:zona", obtenerChismesPorZona);
router.post("/:id/comentario", agregarComentario);
router.post("/:id/reaccion", reaccionarChisme); // <-- ESTA RUTA ES LA CLAVE

module.exports = router;
