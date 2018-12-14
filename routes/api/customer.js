const express = require('express');
const router = express.Router();
const { CustomerController } = require('../../controllers');

router.post('/register', CustomerController.register);

router.post('/login', CustomerController.login);

router.post('/refreshToken', CustomerController.refreshToken);

module.exports = router;
