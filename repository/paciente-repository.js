'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Pacient');

exports.create = async (data) => {
  var customer = new Customer(data);
  await customer.save();
  return customer
}

exports.authenticate = async (data) => {
  const res = await Customer.findOne({
    email: data.email,
    password: data.password
  });
  return res;
}

exports.resendToken = async (data) => {
  const res = await Customer.findOne({
    _id: data.id,
    email: data.email
  });
  return res;
}

exports.list = async () => {
  const res = await Customer.find({});
  return res;
};

exports.forgot = async (data) => {
  const res = await Customer.findOne({email: data});
  return res;
}

exports.redefinir = async (data) => {
  const res = await Customer.findOne({ passResetToken: data});
  return res;
}

exports.verificar = async (data, email) => {
  const res = await Customer.findOne({ accountTokenValidate: data, email: email });
  return res;
};

exports.trocarSenha = async (data, emais) => {
  const res = await Customer.findOne({ password: data, email: emais});
  return res;
}

exports.getById = async (id) => {
  const res = await Customer.findById(id, '-password -passResetToken -passResetExpires');
  return res;
}

exports.update = async (id, data) => {
  const res = await Customer
    .findByIdAndUpdate(id, {
      $set: {
        box: data.box,
        name: data.name,
        idade: data.idade,
        convenio: data.convenio,
        hma: data.hma,
        patologias_previas: data.patologias_previas,
        hd: data.hd,
        med_em_uso: data.med_em_uso,
        data_adm: data.data_adm,
        atb: data.atb,
        temp: data.temp,
        peso: data.peso,
        fc: data.fc,
        pa: data.pa,
        alergia: data.alergia,
        drogas: data.drogas,
        plano_terapeutico: data.plano_terapeutico,
        status: data.status,
      }
    }, { new: true });
  return res
}
