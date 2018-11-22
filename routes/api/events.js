const express = require('express');
const router = express.Router();
const { ClickController } = require('../../controllers');

router.post('/add', ClickController.addEvents);

router.get('/get/clicks/:session', ClickController.getClicks);

router.get('/get/inputs/:session', ClickController.getInputs);

module.exports = router;
