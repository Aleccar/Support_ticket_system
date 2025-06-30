const prisma = require('../lib/prisma');


const prismaCreateComment = async (ticketId, comment, userId) => {
    return await prisma.comments.create({
        data: {
            ticket_id: ticketId,
            comment: comment,
            author_id: userId
        }
    })
};

const prismaCreateCommentWithPrio = async (ticketId, priority, comment, userId) => {
    return await prisma.comments.create({
        data: {
            ticket_id: Number(ticketId),
            priority: priority,
            comment: comment,
            author_id: userId
        }
    })
}

const prismaDeleteComment = async (commentId) => {
    return await prisma.comments.delete({
        where: {
            id: Number(commentId)
        }
    })
}

const prismaDeleteTicketComments = async (ticketId) => {
    return await prisma.comments.deleteMany({
        where: {
            ticket_id: Number(ticketId)
        }
    })
}


const prismaGetCommentByTicket = async (ticketId) => {
    return await prisma.comments.findMany({
        where: {
            ticket_id: Number(ticketId)
        }
    })
}


const prismaUpdateComment = async (id, data) => {
    return await prisma.comments.update({
        where: {
            id: Number(id)
        },
        data: data
    })
}


module.exports = {
    prismaCreateComment,
    prismaCreateCommentWithPrio,
    prismaDeleteComment,
    prismaDeleteTicketComments,
    prismaGetCommentByTicket,
    prismaUpdateComment
}