const express = require('express');
const router = express.Router();
const { EventController } = require('../../controllers');

/*POST*/
router.post('/add', EventController.addEvents);
router.post('/attach', EventController.attachEvents);

/*GET*/
router.get('/attach/:site*?', EventController.getAttachedEvents);
router.get('/all/:site*?/:filter*?', EventController.getActions);  /**/
router.get('/get/:event/:site*?', EventController.getEvents);
router.get('/allTypes', EventController.getAllTypes);
router.get('/clicks/sort', EventController.getAllSortClicks);

/*DELETE*/
router.delete('/deleteAttach', EventController.deleteAttachEvents);

module.exports = router;
