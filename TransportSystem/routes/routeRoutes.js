const express = require('express');
const router = express.Router();
const { generateRoute, listRoutes } = require('../controllers/routeController');

// Create a route
router.post('/routes', generateRoute);

// List all routes
router.get('/routes', listRoutes);

module.exports = router;
