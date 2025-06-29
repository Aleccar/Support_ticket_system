const {
    prismaCreateTicket,
    prismaFindTickets,
    prismaDeleteTicket,
    prismaUpdateTicket,
    prismaFindSpecTicket,
    prismaSupportFindTickets,
    prismaSupportFindTicket,
    prismaSupportDeleteTicket,
    prismaSupportUpdateTicket
} = require('../models/ticketsModel')


const handleTicketCreation = async (req, res) => {
    const { subject, category, description } = req.body
    const userId = req.user.userId


    if (!subject || !category || !description) {
        res.status(400).json({ error: 'Missing required fields: subject, category, and description are all required.' })
    }

    try {
        const newTicket = await prismaCreateTicket(userId, subject, category, description)

        res.status(201).json({ message: `ticket created successfully.` })

    } catch (err) {
        res.status(500).json({ error: 'Failed to create ticket. Please try again later.' })
    }
}


const findMyTickets = async (req, res) => {
    const userId = req.user.userId
    const userRole = req.user.role

    if (userRole === 'support') {
        try {
            const tickets = await prismaSupportFindTickets()
            res.status(200).json(tickets)
        } catch (error) {
            res.status(500).json({ error: 'Could not find any tickets at this time, please try again later.' })
        }
    } else {
        try {
            const tickets = await prismaFindTickets(userId)
            res.status(200).json({ tickets })
        } catch (error) {
            res.status(500).json({ error: 'Could not find any tickets at this time, please try again later.' })
        }
    }

}

const findSpecificTicket = async (req, res) => {
    const userId = req.user.userId
    const id = req.params.id
    const userRole = req.user.role

    if (userRole === 'support') {
        try {
            const foundTicket = await prismaSupportFindTicket(id)
            res.status(200).json(foundTicket)

        } catch (error) {
            res.status(500).json({ error: `Could not find a ticket with ID: ${id}` })
        }
    } else {
        try {
            const myTicket = await prismaFindSpecTicket(id, userId)

            res.status(200).json(myTicket)
        } catch (error) {
            res.status(500).json({ error: `Could not find a ticket with ID: ${id}` })
        }
    }

}

const deleteTicket = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId
    const userRole = req.user.role

    if (userRole === 'support') {
        try {
            const deletedTicket = await prismaSupportDeleteTicket(id)
            res.sendStatus(204)
        } catch (error) {
            res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
        }
    } else {
        try {
            const deletedTicket = await prismaDeleteTicket(id, userId)
            res.sendStatus(204)

        } catch (error) {
            res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
        }
    }

}


const updateTicket = async (req, res) => {
    const id = req.params.id
    const userId = req.user.userId
    const data = req.body
    const userRole = req.user.role

    if (userRole === 'support') {
        try {
            const updatedTicket = await prismaSupportUpdateTicket(id, data)
            res.status(200).json(updatedTicket)
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Could not update ticket at this time, please try again later.' })
        }
    } else {
        try {
            const updatedTicket = await prismaUpdateTicket(id, userId, data)
            res.status(200).json(updatedTicket)

        } catch (error) {
            res.status(500).json({ error: 'Could not update ticket at this time, please try again later.' })
        }
    }
}




module.exports = {
    handleTicketCreation,
    findMyTickets,
    deleteTicket,
    updateTicket,
    findSpecificTicket
}