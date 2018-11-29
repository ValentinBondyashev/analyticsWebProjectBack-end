const express = require('express');
const router = express.Router();
const { EventController } = require('../../controllers');

router.post('/add', EventController.addEvents);

router.post('/attach', EventController.attachEvents);

router.get('/attach/:site', EventController.getAttachedEvents);

router.get('/all/:site/:filter*?', EventController.getActions);

router.get('/:event/:site', EventController.getEvents);

router.get('/allTypes', EventController.getAllTypes);

router.delete('/deleteAttach', EventController.deleteAttachEvents);

module.exports = router;
