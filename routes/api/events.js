const express = require('express');
const router = express.Router();
const { ClickController } = require('../../controllers');

router.post('/add', ClickController.addEvents);

router.post('/attach', ClickController.attachEvents);

router.get('/all/:site', ClickController.getActions);

router.get('/get/clicks/:session', ClickController.getClicks);

router.get('/get/inputs/:session', ClickController.getInputs);

module.exports = router;
