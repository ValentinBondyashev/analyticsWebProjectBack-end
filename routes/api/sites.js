const express = require('express');
const router = express.Router();
const { SitesController } = require('../../controllers');

router.get('/', SitesController.getSites);
router.post('/add', SitesController.addSite);
router.delete('/:uuid', SitesController.deleteSite);

module.exports = router;
