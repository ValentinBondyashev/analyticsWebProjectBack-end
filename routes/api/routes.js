const express = require('express');
const router = express.Router();
const { RoutesController } = require('../../controllers');

router.get('/all/:site', RoutesController.getAllRoutes);
router.post('/add', RoutesController.addRoute);

module.exports = router;
