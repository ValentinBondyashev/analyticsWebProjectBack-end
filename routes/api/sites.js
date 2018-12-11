const express = require('express');
const router = express.Router();
const { SitesController } = require('../../controllers');

/*GET*/
router.get('/', SitesController.getSites);

/*POST*/
router.post('/add', SitesController.addSite);

/*PUT*/
router.put('/edit', SitesController.editAddress);

/*DELETE*/
router.delete('/:uuid', SitesController.deleteSite);

module.exports = router;
