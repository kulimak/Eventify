const express = require('express');
const router = express.Router();

router.use('/users', require('./user.router'));
router.use('/company', require('./company.router'));


module.exports = router;