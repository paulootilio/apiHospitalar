'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/custumer-controler');
const authService = require('../services/auth');

router.post('/', controller.post);
router.put('/update', authService.authorize, controller.put);
router.get('/get-user', authService.authorize, controller.getProfile);
router.post('/authenticate', controller.authenticate);
router.get('/refresh-token', authService.authorize, controller.refreshToken);


module.exports = router;
