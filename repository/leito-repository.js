'use strict';
const mongoose = require('mongoose');
const Leito = mongoose.model('Leito');
const Pacient = mongoose.model('Pacient');
const Uti = mongoose.model('Uti');
const Hospital = mongoose.model('Hospital');
const ObjectId = mongoose.Types.ObjectId;

exports.create = async (data) => {
    var leito = new Leito(data);
    await leito.save();
    return leito;
}

exports.listAll = async (data) => {
  const pacienteNome = Pacient.collection.name
  const utiNome = Uti.collection.name
  const hospitalNome = Hospital.collection.name
  const res = await Leito.aggregate([
    {
      "$match": {
        "status": {
          $ne: 'deactive'
        },
        "uti": ObjectId(data),
      }
    },
    {
      "$lookup": {
        "from": pacienteNome,
        "localField": "_id",
        "foreignField": "box",
        "as": "paciente"
      }
    },
    {
      "$unwind": {
        path: "$paciente"
      },
    },
    {
      "$lookup": {
        "from": utiNome,
        "localField": "uti",
        "foreignField": "_id",
        "as": "uti"
      }
    },
    {
      "$unwind": {
        path: "$uti"
      },
    },
    {
      "$lookup": {
        "from": hospitalNome,
        "localField": "uti.hospital",
        "foreignField": "_id",
        "as": "hospital"
      }
    }, {
      "$unwind": {
        path: "$hospital"
      },
    },
  ])
  return res;
};

exports.checkStatus = async (data) => {
  const res = await Leito.findOne({ _id: data });
  return res;
};

exports.update = async (id, data) => {
    const res = await Leito.findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        status: data.status,
      }
    }, { new: true });
  return res;
}

exports.changeStatus = async (id) => {
    const res = await Leito.findByIdAndUpdate(id, {
      $set: {
        status: 'occupied',
      }
    });
  return res;
}