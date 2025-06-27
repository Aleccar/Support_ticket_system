const express = require('express')
const morgan = require('morgan')
const commentsRouter = require('./routes/commentsRouter')
const ticketsRouter = require('./routes/ticketsRouter')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()
const app = express()



// Middleware
app.use(express.json())
app.use(morgan('short'))


// Initialize routers:
app.use('/user', usersRouter)
app.use('/comments', commentsRouter)
app.use('/tickets', ticketsRouter)

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})