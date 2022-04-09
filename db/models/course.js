//Colecciones => Tablas
//Documentos => Filas o registros que se guardan en la tabla

const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  views: Number,
});

module.exports = mongoose.model("Course", courseSchema);
