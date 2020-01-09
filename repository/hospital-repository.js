'use strict';
const mongoose = require('mongoose');
const Hospital = mongoose.model('Hospital');

exports.create = async (data) => {
    var hospital = new Hospital(data);
    await hospital.save();
    return hospital;
}

exports.listAll = async () => {
  const res = await Hospital.find({ status: 'active' });
  return res;
};

exports.get = async (data) => {
  const res = await Hospital.findOne({ _id: data });
  return res;
};

exports.update = async (id, data) => {
    const res = await Hospital.findByIdAndUpdate(id, {
      $set: {
        name: data.name,
        status: data.status,
      }
    }, { new: true });
  return res;
}