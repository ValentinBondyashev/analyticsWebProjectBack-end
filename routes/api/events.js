const express = require('express');
const router = express.Router();
const { EventController } = require('../../controllers');
const auth = require('../../middleware/auth');


/*POST*/
router.post('/add', EventController.addEvents);
router.post('/attach', auth.tokenCheck, EventController.attachEvents);

/*GET*/
router.get('/attach/:site*?', auth.tokenCheck, EventController.getAttachedEvents);
router.get('/all/*', auth.tokenCheck, EventController.getActions);
router.get('/get/:event/:site*?', auth.tokenCheck, EventController.getEvents);
router.get('/allTypes', EventController.getAllTypes);
router.get('/clicks/sort',  auth.tokenCheck, EventController.getAllSortClicks);

/*DELETE*/
router.delete('/deleteAttach', auth.tokenCheck, EventController.deleteAttachEvents);

module.exports = router;
