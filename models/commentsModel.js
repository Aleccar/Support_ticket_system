const prisma = require('../lib/prisma');


const prismaCreateComment = async (ticketId, comment, userId) => {
    const ticketExists = await prisma.tickets.findUnique({
        where: {
            id: Number(ticketId)
        }
    })
    if (ticketExists) {
        return await prisma.comments.create({
            data: {
                ticket_id: Number(ticketId),
                comment: comment,
                author_id: userId
            }
        })
    } else return null
};

const prismaCreateCommentWithPrio = async (ticketId, priority, comment, userId) => {
    const ticketExists = await prisma.tickets.findUnique({
        where: {
            id: Number(ticketId)
        }
    })
    if (ticketExists) {
        return await prisma.comments.create({
            data: {
                ticket_id: Number(ticketId),
                priority: priority,
                comment: comment,
                author_id: userId
            }
        })
    } else return null
}

const prismaDeleteComment = async (commentId) => {
    const commentExists = await prisma.comments.findUnique({
        where: {
            id: Number(commentId)
        }
    })
    if (commentExists) {
        return await prisma.comments.delete({
            where: {
                id: Number(commentId)
            }
        })
    } else return null
}

const prismaDeleteTicketComments = async (ticketId) => {
    const ticketExists = await prisma.tickets.findUnique({
        where: {
            id: Number(ticketId)
        }
    })
    if (ticketExists) {
            return await prisma.comments.deleteMany({
                where: {
                    ticket_id: Number(ticketId)
                }
            })
    } else return null
}


const prismaGetCommentByTicket = async (ticketId) => {
    return await prisma.comments.findMany({
        where: {
            ticket_id: Number(ticketId)
        }
    })
}


const prismaUpdateComment = async (id, data) => {
    const commentExists = await prisma.comments.findUnique({
        where:{
            id: Number(id)
        }
    })
    if (commentExists) {
        return await prisma.comments.update({
            where: {
                id: Number(id)
            },
            data: data
        })
    } else return null
}


module.exports = {
    prismaCreateComment,
    prismaCreateCommentWithPrio,
    prismaDeleteComment,
    prismaDeleteTicketComments,
    prismaGetCommentByTicket,
    prismaUpdateComment
}