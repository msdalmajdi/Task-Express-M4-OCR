const express = require('express');
const router = express.Router();
const { ocrCreate } = require('./ocr.controllers');

router.post('/', ocrCreate);

module.exports = router;
