const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer'));
router.use('/clicks', require('./clicks'));

module.exports = router;
