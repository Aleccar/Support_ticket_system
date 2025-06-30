const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');
const { createComment, deleteComment, deleteAllTicketComments, getCommentsByTicket, updateCommentById } = require('..//controllers/commentsController')



const commentsRouter = express.Router({ mergeParams: true });





commentsRouter.get('/', authenticate, getCommentsByTicket)
commentsRouter.post('/', authenticate, createComment)
commentsRouter.delete('/', authenticate, deleteComment)
commentsRouter.delete('/all', authenticate, deleteAllTicketComments)
commentsRouter.put('/', authenticate, updateCommentById)













module.exports = commentsRouter;