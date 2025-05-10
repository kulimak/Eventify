const express = require('express');
const router = express.Router();
const eventRegistration = require('../controllers/eventRegistration.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

//New Registration
router.post('/new', authMiddleware, eventRegistration.newRegistration);

//Delete Registration
router.delete('/delete/:id', authMiddleware, eventRegistration.delete);

//Get all Registrtions
router.get('/get', authMiddleware, eventRegistration.getAll);

//Get one Registration by id
router.get('/get/:id', authMiddleware, eventRegistration.getAllById);

module.exports = router