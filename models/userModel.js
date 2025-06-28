const prisma = require('../lib/prisma');


//TODO: Remove this later:
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


const registerUser = async (username, email, hashedPassword, role) => {
    return await prisma.users.create({
        data: {
            username,
            email,
            password: hashedPassword,
            role
        }
    })
};


const loginUser = async (email) => {
    return await prisma.users.findUnique({
        where: {
            email: email
        }
    })
};



module.exports = {
    registerUser,
    loginUser
};
