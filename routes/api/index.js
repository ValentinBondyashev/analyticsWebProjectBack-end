const express = require('express');
const router = express.Router();

router.use('/customer', require('./customer'));
router.use('/events', require('./events'));
router.use('/sites', require('./sites'));
router.use('/routes', require('./routes'));

module.exports = router;
