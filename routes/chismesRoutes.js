// routes/chismesRoutes.js
const express = require("express");
const router = express.Router();
const {
  publicarChisme,
  obtenerChismesPorZona,
  agregarComentario,
  reaccionarChisme,
  reportarChisme // 👈 importar
} = require("../controllers/chismesController");

router.post("/", publicarChisme);
router.get("/zona/:zona", obtenerChismesPorZona);
router.post("/:id/comentario", agregarComentario);
router.post("/:id/reaccion", reaccionarChisme);
router.post("/:id/reportar", reportarChisme); // 👈 nueva ruta

module.exports = router;
