const express = require('express');
const { handleRegister, handleLogin } = require('../controllers/authController');
const { authenticate } = require('../middleware/authMiddleware');
const { getMe } = require('../controllers/currentUserController');



const userRouter = express.Router();




userRouter.post('/register', handleRegister);
userRouter.post('/login', handleLogin)


userRouter.get('/me', authenticate, getMe)





module.exports = userRouter;