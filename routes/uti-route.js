'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controlers/uti-controler');

router.post('/', controller.post);
router.get('/get/:id', controller.get);
router.get('/list/:hospital', controller.list);
router.put('/update/:id', controller.put);

module.exports = router;