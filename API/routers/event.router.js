const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

//New Event
router.post('/newevent', authMiddleware, upload.single('file'), eventController.newevent);

//Get all Events
router.get('/get', authMiddleware, eventController.getAll);

//Get one Evenet by id
router.get('/get/:id', authMiddleware, eventController.getOneById);

//Delete Event
router.delete('/delete/:id', authMiddleware, eventController.delete);

//Update Event
router.patch('/update/:id', authMiddleware, upload.single('file'), eventController.update);

module.exports = router