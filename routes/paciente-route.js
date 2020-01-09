'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/paciente-controler');

router.post('/', controller.post);
router.get('/', controller.list);
router.get('/get/:id', controller.getProfile);
router.put('/update/:id', controller.put);

module.exports = router;