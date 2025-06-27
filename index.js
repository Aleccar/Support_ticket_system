const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const app = express()



// Middleware
app.use(express.json())
app.use(morgan('short'))


PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})