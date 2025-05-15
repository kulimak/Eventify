const express = require('express');
const router = express.Router();
const userRatingsController = require('../controllers/userRatings.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

//New Rating
router.post('/new', authMiddleware, userRatingsController.newRating);

//Update Rating
router.patch('/update/:id', authMiddleware, userRatingsController.updateRating);

//Delete Rating
router.delete('/delete/:id', authMiddleware, userRatingsController.delete);

//Get all Events
router.get('/get', authMiddleware, userRatingsController.getAll);

//Get one Evenet by id
router.get('/get/:id', authMiddleware, userRatingsController.getAllById);

module.exports = router