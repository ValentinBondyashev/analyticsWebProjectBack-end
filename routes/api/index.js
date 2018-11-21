const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer'));
router.use('/clicks', require('./clicks'));
router.use('/sites', require('./sites'));

module.exports = router;
