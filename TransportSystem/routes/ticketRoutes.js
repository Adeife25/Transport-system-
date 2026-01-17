const express = require('express');
const router = express.Router();
const { generateTicket, listTickets, downloadTicket, ticketDetails } = require('../controllers/ticketController');

// Ticket routes
router.post('/tickets/generate', generateTicket);
router.get('/tickets', listTickets);
router.get('/download-ticket/:ticket_number', downloadTicket);
router.get('/ticket/:ticket_number', ticketDetails);

module.exports = router;
