const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

//New Event
router.post('/newevent', authMiddleware, eventController.newevent);

module.exports = router