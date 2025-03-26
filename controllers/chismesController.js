const Chisme = require("../models/Chisme");

const publicarChisme = async (req, res) => {
  try {
    const { contenido, alias, zona, userId } = req.body;
    const total = await Chisme.countDocuments({ userId });
    let etiqueta = "";

    if (total >= 100) etiqueta = "👑 Reina del Chisme";
    else if (total >= 50) etiqueta = "🪴 Vieja de Patio";
    else if (total >= 25) etiqueta = "🧓 Vieja Chismosa";
    else etiqueta = "🐣 Nuevo Chismoso";

    const nuevoChisme = new Chisme({ contenido, alias, zona, userId, etiqueta });
    await nuevoChisme.save();
req.io.emit("nuevo-chisme", nuevoChisme); // 🔥 EMITIR EVENTO
res.status(201).json(nuevoChisme);

  } catch (error) {
    res.status(500).json({ error: "Error al publicar chisme" });
  }
};

const obtenerChismesPorZona = async (req, res) => {
  try {
    const { zona } = req.params;
    const chismes = await Chisme.find({ zona }).sort({ fecha: -1 });
    res.json(chismes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener chismes" });
  }
};

const agregarComentario = async (req, res) => {
  try {
    const { id } = req.params; // ← CORREGIDO AQUÍ
    const { comentario } = req.body;

    const chisme = await Chisme.findById(id);
    if (!chisme) return res.status(404).json({ error: "Chisme no encontrado" });

    chisme.comentarios.push(comentario);
await chisme.save();

req.io.emit("nuevo-comentario", chisme); // 🔥 EMITIR EVENTO
res.json(chisme);

  } catch (error) {
    res.status(500).json({ error: "Error al agregar comentario" });
  }
};

const reaccionarChisme = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, userId } = req.body;

    const chisme = await Chisme.findById(id);
    if (!chisme) return res.status(404).json({ error: "Chisme no encontrado" });

    // Eliminar reacción anterior del mismo userId
    chisme.reacciones = chisme.reacciones.filter(r => r.userId !== userId);
chisme.reacciones.push({ userId, tipo });

await chisme.save();

req.io.emit("nueva-reaccion", chisme); // 🔥 EMITIR EVENTO
res.json(chisme);

  } catch (error) {
    console.error("Error al reaccionar:", error.message);
    res.status(500).json({ error: "Error al reaccionar" });
  }
};


module.exports = {
  publicarChisme,
  obtenerChismesPorZona,
  agregarComentario,
  reaccionarChisme
};
