const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleTicketCreation } = require('../controllers/ticketController');



const ticketsRouter = express.Router();



ticketsRouter.post('/create', authenticate, handleTicketCreation)
















module.exports = ticketsRouter;