'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const conf = require('../config');

const app = express();
const router = express.Router();
const morgan = require('morgan')

var corsOptions = { origin: '*', optionsSuccessStatus: 200 }

mongoose.connect(conf.connectioString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const Pacientes = require('../models/Pacientes');
const Hospital = require('../models/Hospital');
const Uti = require('../models/Uti');
const Customer = require('../models/customer');
const Leito = require('../models/Leito');

const pacienteRoute = require('../routes/paciente-route');
const hospitalRoute = require('../routes/hospital-route');
const utiRoute = require('../routes/uti-route');
const customerRoute = require('../routes/customer-route');
const leitoRoute = require('../routes/leito-route');

app.use(cors(corsOptions))

app.use(bodyParser.json({
  limit: '50mb', extended: true
}));
app.use(bodyParser.urlencoded({
  limit: '50mb', extended: true
}));
app.use(morgan('combined'));

app.use('/paciente', pacienteRoute);
app.use('/hospital', hospitalRoute);
app.use('/uti', utiRoute);
app.use('/usuario', customerRoute);
app.use('/leito', leitoRoute);

module.exports = app;
