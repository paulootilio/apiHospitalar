'use strict';
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');

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

exports.getById = async (id) => {
  const res = await Customer.findById(id, '-password -passResetToken -passResetExpires');
  return res;
}

exports.update = async (id, data) => {
  const res = await Customer
    .findByIdAndUpdate(id, {
      $set: {
        fullname: data.fullname,
        nick: data.nick,
        fone: data.fone
      }
    });
  return res
}
