const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { handleTicketCreation, findMyTickets, deleteTicket, updateTicket, findSpecificTicket } = require('../controllers/ticketController');



const ticketsRouter = express.Router();



ticketsRouter.post('/create', authenticate, handleTicketCreation)
ticketsRouter.get('/', authenticate, findMyTickets)
ticketsRouter.get('/:id', authenticate, findSpecificTicket)
ticketsRouter.delete('/:id', authenticate, deleteTicket)
ticketsRouter.put('/:id', authenticate, updateTicket)













module.exports = ticketsRouter;