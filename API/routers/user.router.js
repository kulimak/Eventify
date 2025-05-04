const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// register new user
router.post('/register', userController.register);

//login user
router.post('/login', userController.login);

//upload profile picture
router.patch('/image/:id', authMiddleware, upload.single('file'), userController.image);

//update password
router.patch('/password/:id', authMiddleware, userController.password);

//update email
router.patch('/email/:id', authMiddleware, userController.email);

//update username
router.patch('/username/:id', authMiddleware, userController.username);

//get user by id 
router.get('/get/:id', authMiddleware, userController.getUserById);

module.exports = router