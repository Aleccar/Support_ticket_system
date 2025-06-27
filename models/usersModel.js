const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// model users {
//   id                                 Int        @id @default(autoincrement())
//   username                           String     @unique @db.VarChar(25)
//   email                              String     @unique @db.VarChar
//   password                           String     @db.VarChar(20)
//   role                               enum_role?
//   created_at                         DateTime?  @db.Timestamp(6)
//   comments                           comments[]
//   tickets_tickets_assigned_toTousers tickets[]  @relation("tickets_assigned_toTousers")
//   tickets_tickets_creator_idTousers  tickets[]  @relation("tickets_creator_idTousers")
// }


const registerUser = async (username, email, password, role) => {

    async function prismaRegister(username, email, password, role) {
        const { data, error } = await prisma.users.create({
            username: username,
            email: email,
            password: password,
            role: role
        })

        return { data, error }
    }

    prismaRegister(username, email, password, role)
    .then(async () => {
        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect
        process.exit(1)
    });
}




module.exports = registerUser
