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


const handleTicketCreation = async (req, res, next) => {
    const { subject, category, description } = req.body
    const userId = req.user.userId

    if (!subject || !category || !description) {
        return res.status(400).json({ error: 'Missing required fields: subject, category, and description are all required.' })
    }

    try {
        const newTicket = await prismaCreateTicket(userId, subject, category, description)
        return res.status(201).json({ message: `ticket created successfully.` })
    } catch (error) {
        next(error)
    }
}


const findMyTickets = async (req, res, next) => {
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const tickets = await prismaSupportFindTickets()
            return res.status(200).json(tickets)
        } catch (error) {
            next(error)
        }
    }

    try {
        const tickets = await prismaFindTickets(userId)
        return res.status(200).json({ tickets })
    } catch (error) {
        next(error)
    }
}


const findSpecificTicket = async (req, res, next) => {
    const id = req.params.id
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const foundTicket = await prismaSupportFindTicket(id)
            return res.status(200).json(foundTicket)
        } catch (error) {
            next(error)
        }
    }

    try {
        const myTicket = await prismaFindSpecTicket(id, userId)
        return res.status(200).json(myTicket)
    } catch (error) {
        next(error)
    }
}


const deleteTicket = async (req, res, next) => {
    const id = req.params.id
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            const deletedTicket = await prismaSupportDeleteTicket(id)
            return res.status(200).json({ message: `Ticket deleted.` })
        } catch (error) {
            next(error)
        }
    }

    try {
        const deletedTicket = await prismaDeleteTicket(id, userId)
        return res.status(200).json({ message: `Ticket deleted.` })
    } catch (error) {
        next(error)
    }
}


const updateTicket = async (req, res, next) => {
    const id = req.params.id
    const data = req.body
    const { userId, role } = req.user

    if (role === 'support') {
        try {
            if (data.assigned_to) {
                data.assigned_to = Number(data.assigned_to)
                const updatedTicket = await prismaSupportUpdateTicket(id, data)
                return res.status(200).json(updatedTicket)
            }

            const updatedTicket = await prismaSupportUpdateTicket(id, data)
            return res.status(200).json(updatedTicket)
        } catch (error) {
            next(error)
        }
    }

    try {
        if (data.assigned_to) {
            return res.status(400).json('You do not have permission to assign tickets to others.')
        }

        const updatedTicket = await prismaUpdateTicket(id, userId, data)
        return res.status(200).json(updatedTicket)
    } catch (error) {
        next(error)
    }
}


module.exports = {
    handleTicketCreation,
    findMyTickets,
    deleteTicket,
    updateTicket,
    findSpecificTicket
}