const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyUser.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware')

// register new user
router.post('/register', companyController.register);

//login user
router.post('/login', companyController.login);
/*
//upload profile picture
router.patch('/image/:id', authMiddleware, upload.single('file'), userController.image);

//update password
router.patch('/password/:id', authMiddleware, userController.password);

//update email
router.patch('/email/:id', authMiddleware, userController.email);

//update username
router.patch('/username/:id', authMiddleware, userController.username);
*/
module.exports = router