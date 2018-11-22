const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer'));
router.use('/events', require('./events'));
router.use('/sites', require('./sites'));

module.exports = router;
