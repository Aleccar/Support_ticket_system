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


const createTicket = async (userId, subject, category, description) => {
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


module.exports = {
    createTicket
}