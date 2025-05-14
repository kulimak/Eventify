const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

//Get all Categories
router.get('/get', categoriesController.getAll)

//New Catrgory
router.post('/new', authMiddleware, categoriesController.newCategory)

module.exports = router