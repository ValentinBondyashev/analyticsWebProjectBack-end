const express = require('express');
const router = express.Router();
const { ClickController } = require('../../controllers');

router.post('/add', ClickController.addClicks);

router.get('/get/:user', ClickController.getClicks);

module.exports = router;
