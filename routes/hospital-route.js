'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/hospital-controler');
const authService = require('../services/auth');

router.post('/', authService.authorize, controller.post);
router.get('/', authService.authorize, controller.list);
router.put('/update/:id', authService.authorize, controller.put);
router.get('/get/:id', authService.authorize, controller.get);

module.exports = router;