const express = require('express');
const router = express.Router();
const { SitesController } = require('../../controllers');
const auth = require('../../middleware/auth');

/*GET*/
router.get('/', auth.tokenCheck, SitesController.getSites);

/*POST*/
router.post('/add', auth.tokenCheck, SitesController.addSite);

/*PUT*/
router.put('/edit', auth.tokenCheck, SitesController.editAddress);

/*DELETE*/
router.delete('/:uuid', auth.tokenCheck, SitesController.deleteSite);

module.exports = router;
