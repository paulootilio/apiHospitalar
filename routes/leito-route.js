'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/leito-controler');

router.post('/', controller.post);
router.get('/list/:uti', controller.list);
router.put('/update/:id', controller.put);

module.exports = router;