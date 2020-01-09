const mongoose = require("mongoose");

const model = mongoose.model("Pacient", {
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  box: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Leito",
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  idade: {
    type: Number,
    required: true,
  },
  convenio: {
    type: String,
    required: true,
  },
  hma: {
    type: String,
    required: true,
  },
  patologias_previas: {
    type: String,
    required: true,
  },
  hd: {
    type: String,
    required: true,
  },
  med_em_uso: {
    type: String,
    required: true,
  },
  data_adm: {
    type: Date,
    required: true,
  },
  atb: {
    type: String,
    required: true,
  },
  temp: {
    type: Number,
    required: true
  },
  peso: {
    type: Number,
    required: true
  },
  fc: {
    type: Number,
    required: true
  },
  pa: {
    type: String,
    required: true
  },
  alergia: {
    type: String,
    required: true
  },
  drogas: {
    type: String,
    required: true
  },
  plano_terapeutico: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['obito', 'alta_enfermaria', 'alta_domiciliar']
  },
});

module.exports = model;
