const express = require('express')
const morgan = require('morgan')
const commentsRouter = require('./routes/commentsRouter')
const ticketsRouter = require('./routes/ticketsRouter')
const userRouter = require('./routes/userRouter')
const prisma = require('./lib/prisma')
const errorHandler = require('./middleware/errorHandlerMiddleware')
require('dotenv').config()




const app = express()


// Middleware
app.use(express.json())
app.use(morgan('short'))
app.use(errorHandler)


// Initialize routers:
app.use('/user', userRouter)
app.use('/tickets/:id/comments', commentsRouter)
app.use('/tickets', ticketsRouter)

PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

// Shut down Prisma client on closing API.
process.on('SIGINT', async () => {
    console.log('\nShutting down...');
    await prisma.$disconnect();
    process.exit(0);
});