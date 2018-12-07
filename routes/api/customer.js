const express = require('express');
const router = express.Router();
const { CustomerController } = require('../../controllers');

router.post('/register', CustomerController.register);

router.post('/login', CustomerController.login);

router.post('/redirect', CustomerController.redirectToAnalytic);

module.exports = router;
