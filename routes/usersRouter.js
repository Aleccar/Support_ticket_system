const express = require('express');
const { handleRegister } = require('../controllers/authController');



const usersRouter = express.Router();




usersRouter.post('/register', handleRegister);










module.exports = usersRouter;