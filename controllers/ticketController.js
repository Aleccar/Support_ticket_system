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
        return res.status(400).json({ error: 'Missing required fields: subject, category, and description are all required.' })
    }

    try {
        const newTicket = await prismaCreateTicket(userId, subject, category, description)
        return res.status(201).json({ message: `ticket created successfully.` })
    } catch (err) {
        return res.status(500).json({ error: 'Failed to create ticket. Please try again later.' })
    }
}


const findMyTickets = async (req, res) => {
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const tickets = await prismaSupportFindTickets()
            return res.status(200).json(tickets)
        } catch (error) {
            return res.status(500).json({ error: 'Could not find any tickets at this time, please try again later.' })
        }
    }

    try {
        const tickets = await prismaFindTickets(userId)
        return res.status(200).json({ tickets })
    } catch (error) {
        return res.status(500).json({ error: 'Could not find any tickets at this time, please try again later.' })
    }
}

const findSpecificTicket = async (req, res) => {
    const id = req.params.id
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const foundTicket = await prismaSupportFindTicket(id)
            return res.status(200).json(foundTicket)
        } catch (error) {
            return res.status(500).json({ error: `Could not find a ticket with ID: ${id}` })
        }
    }

    try {
        const myTicket = await prismaFindSpecTicket(id, userId)
        return res.status(200).json(myTicket)
    } catch (error) {
        return res.status(500).json({ error: `Could not find a ticket with ID: ${id}` })
    }
}

const deleteTicket = async (req, res) => {
    const id = req.params.id
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const deletedTicket = await prismaSupportDeleteTicket(id)
            return res.sendStatus(204)
        } catch (error) {
            return res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
        }
    }

    try {
        const deletedTicket = await prismaDeleteTicket(id, userId)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({ error: `Failed to delete task with ID: ${id}` })
    }
}


const updateTicket = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const updatedTicket = await prismaSupportUpdateTicket(id, data)
            return res.status(200).json(updatedTicket)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not update ticket at this time, please try again later.' })
        }
    }

    try {
        const updatedTicket = await prismaUpdateTicket(id, userId, data)
        return res.status(200).json(updatedTicket)
    } catch (error) {
        return res.status(500).json({ error: 'Could not update ticket at this time, please try again later.' })
    }

}




module.exports = {
    handleTicketCreation,
    findMyTickets,
    deleteTicket,
    updateTicket,
    findSpecificTicket
}