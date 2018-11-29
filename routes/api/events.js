const express = require('express');
const router = express.Router();
const { ClickController } = require('../../controllers');

router.post('/add', ClickController.addEvents);

router.post('/attach', ClickController.attachEvents);

router.get('/attach/:site', ClickController.getAttachedEvents);

router.get('/all/:site', ClickController.getActions);

router.get('/:event/:site', ClickController.getEvents);

router.get('/get/clicks/:session', ClickController.getClicks);

router.get('/get/inputs/:session', ClickController.getInputs);

router.get('/allTypes', ClickController.getAllTypes);

module.exports = router;
