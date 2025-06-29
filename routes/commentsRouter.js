const express = require('express');
const { authenticate } = require('../middleware/authMiddleware');



const commentsRouter = express.Router();





commentsRouter.post('/', authenticate)














module.exports = commentsRouter;