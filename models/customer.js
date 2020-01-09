'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
    unique: true,
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    index: true,
    unique: true
  },
  fone: {
    type: String,
    required: false,
  },
  passResetExpires: {
    type: Date
  },
  passResetToken: {
    type: String
  },
  admin_token_data: {
    type: String
  },
  accountTokenValidate: {
    type: String
  },
  role: {
    type: String,
    enum: ["user", "supervisor", "admin"],
    default: "admin"
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', schema)
