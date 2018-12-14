const express = require('express');
const router = express.Router();
const { RoutesController } = require('../../controllers');
const auth = require('../../middleware/auth');

router.get('/all/:site', auth.tokenCheck, RoutesController.getAllRoutes);
router.post('/add', RoutesController.addRoute);

module.exports = router;
