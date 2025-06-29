const prisma = require('../lib/prisma');

//TODO: Remove this later:
// model tickets {
//   id                               Int            @id @default(autoincrement())
//   subject                          String         @db.VarChar(50)
//   category                         String         @db.VarChar(20)
//   description                      String         @db.VarChar(500)
//   status                           active_status?
//   creator_id                       Int?
//   assigned_to                      Int?
//   created_at                       DateTime?      @default(now()) @db.Timestamp(6)
//   updated_at                       DateTime?      @db.Timestamp(6)
//   comments                         comments[]
//   users_tickets_assigned_toTousers users?         @relation("tickets_assigned_toTousers", fields: [assigned_to], references: [id], onDelete: NoAction, onUpdate: NoAction)
//   users_tickets_creator_idTousers  users?         @relation("tickets_creator_idTousers", fields: [creator_id], references: [id], onDelete: NoAction, onUpdate: NoAction, map: "user_tickets")

//   @@index([assigned_to])
//   @@index([creator_id])
//   @@index([status])
// }

const prismaSupportFindTickets = async () => {
    return await prisma.tickets.findMany()
}


const prismaCreateTicket = async (userId, subject, category, description) => {
    return await prisma.tickets.create({
        data: {
            subject,
            category,
            description,
            status: 'Open',
            creator_id: userId
        }
    })
};

const prismaFindTickets = async (userId) => {
    return await prisma.tickets.findMany({
        where: {
            creator_id: userId
        }
    })
}

const prismaFindSpecTicket = async (id, userId) => {
    return await prisma.tickets.findFirst({
        where: {
            id: Number(id),
            creator_id: userId
        }
    })
}

const prismaDeleteTicket = async (id, userId) => {
    return await prisma.tickets.delete({
        where: {
            id: Number(id),
            creator_id: userId
        }
    })
}

const prismaUpdateTicket = async (id, userId, data) => {
    return await prisma.tickets.update({
        where: {
            id: Number(id),
            creator_id: userId
        },
        data: data
    })
}


module.exports = {
    prismaCreateTicket,
    prismaFindTickets,
    prismaDeleteTicket,
    prismaUpdateTicket,
    prismaFindSpecTicket,
    prismaSupportFindTickets
}