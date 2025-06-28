const express = require('express');
const { handleRegister } = require('../controllers/authController');



const userRouter = express.Router();




userRouter.post('/register', handleRegister);










module.exports = userRouter;