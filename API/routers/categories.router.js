const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

//Get all Categories
router.get('/get', categoriesController.getAll)

module.exports = router