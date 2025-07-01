const { prismaCreateComment, prismaCreateCommentWithPrio, prismaDeleteComment, prismaDeleteTicketComments, prismaGetCommentByTicket, prismaUpdateComment } = require("../models/commentsModel")

const createComment = async (req, res, next) => {
    const ticketId = req.params.id
    const { userId, role } = req.user
    const { priority, comment } = req.body

    if (role !== 'support') {
        return res.status(400).json({ error: 'You do not have permissions to create a comment.' })
    }

    try {
        if (!priority) {
            const newComment = await prismaCreateComment(ticketId, comment, userId)
            return res.status(201).json({ success: 'Comment created successfully!' })

        } else {
            const newComment = await prismaCreateCommentWithPrio(ticketId, priority, comment, userId)
            return res.status(201).json({ success: 'Comment created successfully!' })
        }
    } catch (error) {
        next(error)
    }
}


const deleteComment = async (req, res, next) => {
    const commentId = req.params.id
    const { role } = req.user

    if (role !== 'support') {
        return res.status(400).json({ error: 'You do not have permissions to delete a comment.' })
    }

    try {
        const deletedComment = await prismaDeleteComment(commentId)
        return res.status(200).json({ message: `Comment deleted.` })
    } catch (error) {
        next(error)
    }
}


const deleteAllTicketComments = async (req, res, next) => {
    const ticketId = req.params.id
    const { role } = req.user

    if (role !== 'support') {
        return res.status(400).json({ error: 'You do not have permissions to delete comments.' })
    }

    try {
        const deletedComments = await prismaDeleteTicketComments(ticketId)
        return res.status(200).json({ message: `All comments for this ticket deleted.` })
    } catch (error) {
        next(error)
    }
}


const getCommentsByTicket = async (req, res, next) => {
    const ticketId = req.params.id
    const { role } = req.user

    if (role !== 'support') {
        return res.status(400).json({ error: 'You do not have permission to view comments.' })
    }

    try {
        const allComments = await prismaGetCommentByTicket(ticketId)
        return res.status(200).json(allComments)
    } catch (error) {
        next(error)
    }
}


const updateCommentById = async (req, res, next) => {
    const id = req.params.id
    const { role } = req.user
    const data = req.body

    if (role !== 'support') {
        return res.status(400).json({ error: 'You do not have permission to update comments.' })
    }

    try {
        const updatedComment = await prismaUpdateComment(id, data)
        return res.status(200).json({ message: 'Comment has been updated.' })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createComment,
    deleteComment,
    deleteAllTicketComments,
    getCommentsByTicket,
    updateCommentById
}