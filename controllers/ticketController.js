const { createTicket } = require('../models/ticketsModel')


const handleTicketCreation = async (req, res) => {
    const { subject, category, description } = req.body
    const userId = req.user.userId


    if (!subject || !category || !description) {
        res.status(400).json({ error: 'Missing required fields: subject, category, and description are all required.' })
    }

    try {
        const newTicket = await createTicket(userId, subject, category, description)

        res.status(201).json({ message: `ticket created successfully.` })


        console.log(newTicket)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to create ticket. Please try again later.' })
    }
}








module.exports = {
    handleTicketCreation
}