const { prismaCreateComment, prismaCreateCommentWithPrio, prismaDeleteComment, prismaDeleteTicketComments, prismaGetCommentByTicket, prismaUpdateComment } = require("../models/commentsModel")

const createComment = async (req, res) => {
    const ticketId = req.params.id
    const { userId, role } = req.user
    const { priority, comment } = req.body

    if (role === 'support') {
        try {
            if (!priority) {
                const newComment = await prismaCreateComment(ticketId, comment, userId)
                return res.status(201).json({ success: 'Comment created successfully!' })

            } else {
                const newComment = await prismaCreateCommentWithPrio(ticketId, priority, comment, userId)
                return res.status(201).json({ success: 'Comment created successfully!' })
            }

        } catch (error) {
            return res.status(500).json({ error: 'Could not create a comment at this time, please try again later.' })
        }

    } else {
        return res.status(400).json({ error: 'You do not have permissions to create a comment.' })
    }
}


const deleteComment = async (req, res) => {
    const commentId = req.params.id
    const { role } = req.user

    if (role === 'support') {
        try {
            const deletedComment = await prismaDeleteComment(commentId)
            return res.status(200).json({ message: `Comment deleted.` })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not delete comment at this time, please try again later.' })
        }
    } else {
        return res.status(400).json({ error: 'You do not have permissions to delete a comment.' })
    }
}


const deleteAllTicketComments = async (req, res) => {
    const ticketId = req.params.id
    const { role } = req.user

    if (role === 'support') {
        try {
            const deletedComments = await prismaDeleteTicketComments(ticketId)
            return res.status(200).json({ message: `All comments for this ticket deleted.` })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Could not delete comment at this time, please try again later.' })
        }
    } else {
        return res.status(400).json({ error: 'You do not have permissions to delete comments.' })
    }
}


const getCommentsByTicket = async (req, res) => {
    const ticketId = req.params.id
    const { role } = req.user

    if (role === 'support') {
        try {
            const allComments = await prismaGetCommentByTicket(ticketId)
            return res.status(200).json(allComments)
        } catch (error) {
            res.status(500).json({ error: 'Could not retrieve any comments at this time, please try again later.' })
        }

    } else {
        return res.status(400).json({ error: 'You do not have permission to view comments.' })
    }
}


const updateCommentById = async (req, res) => {
    const id = req.params.id
    const { role } = req.user
    const data = req.body

    if (role === 'support') {
        try {
            const updatedComment = await prismaUpdateComment(id, data)
            return res.status(200).json({ message: 'Comment has been updated.' })
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Could not update the comment at this time, please try again later.' })
        }

    } else {
        return res.status(400).json({ error: 'You do not have permission to update comments.' })
    }
}


module.exports = {
    createComment,
    deleteComment,
    deleteAllTicketComments,
    getCommentsByTicket,
    updateCommentById
}