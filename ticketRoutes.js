const express = require('express');
const router = express.Router();

const { generateTicket, listTickets } = require('../controllers/ticketController');

// Create ticket
router.post('/tickets/generate', generateTicket);

// View all tickets
router.get('/tickets', listTickets);

module.exports = router;
