const express = require('express');
const router = express.Router();
const eventRatingController = require('../controllers/eventRating.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

//New Rating
router.post('/new', authMiddleware, eventRatingController.newRating);

//Update Rating
router.patch('/update/:id', authMiddleware, eventRatingController.updateRating);

//Delete Rating
router.delete('/delete/:id', authMiddleware, eventRatingController.delete);

//Get all Events
router.get('/get', authMiddleware, eventRatingController.getAll);

//Get one Evenet by id
router.get('/get/:id', authMiddleware, eventRatingController.getAllById);

module.exports = router