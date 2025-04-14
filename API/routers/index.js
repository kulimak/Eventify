const express = require('express');
const router = express.Router();

router.use('/users', require('./user.router'));

router.use('/company', require('./company.router'));

router.use('/event', require('./event.router'));

router.use('/eventrating', require('./eventRating.router'));

module.exports = router;