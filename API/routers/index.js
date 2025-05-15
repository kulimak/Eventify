const express = require('express');
const router = express.Router();

// User routes
router.use('/users', require('./user.router'));

// company user routes
router.use('/company', require('./company.router'));

// Event routes
router.use('/event', require('./event.router'));

// evetn Rating routes
router.use('/eventrating', require('./eventRating.router'));

// user Rating routes
router.use('/userrating', require('./userRating.router'));

// Registrations routes
router.use('/eventregistrations', require('./eventRegistrations.router'));

// Categories routes
router.use('/categories', require('./categories.router'))

// Email routes
router.use('/email', require('./email.router'))

module.exports = router;