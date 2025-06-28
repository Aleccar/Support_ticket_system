const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleTicketCreation, findMyTickets, deleteTicket } = require('../controllers/ticketController');



const ticketsRouter = express.Router();



ticketsRouter.post('/create', authenticate, handleTicketCreation)
ticketsRouter.get('/', authenticate, findMyTickets)
ticketsRouter.delete('/:id', authenticate, deleteTicket)














module.exports = ticketsRouter;