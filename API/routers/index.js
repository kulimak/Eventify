const express = require('express');
const router = express.Router();

// User routes
router.use('/users', require('./user.router'));

// company user routes
router.use('/company', require('./company.router'));

// Event routes
router.use('/event', require('./event.router'));

// Rating routes
router.use('/eventrating', require('./eventRating.router'));

// Registrations routes
router.use('/eventregistrations', require('./eventRegistrations.router'));

// Categories routes
router.use('/categories', require('./categories.router'))

module.exports = router;