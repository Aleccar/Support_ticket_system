const { createTicket, findTickets, deleteTicketById } = require('../models/ticketsModel')


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
        res.status(500).json({ error: 'Failed to create ticket. Please try again later.' })
    }
}


const findMyTickets = async (req, res) => {
    const userId = req.user.userId
    console.log(userId)

    try {
        const tickets = await findTickets(userId)
        res.status(200).json({ tickets })
    } catch (error) {
        res.status(500).json({ error: 'Could not find any tickets at this time, please try again later.' })
    }
}

const deleteTicket = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId

    try {
        const deletedTicket = await deleteTicketById(id, userId) 
        console.log (deletedTicket)
        res.sendStatus(204)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
    }
}





module.exports = {
    handleTicketCreation,
    findMyTickets,
    deleteTicket
}