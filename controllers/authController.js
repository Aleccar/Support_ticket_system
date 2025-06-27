const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {registerUser} = require('../models/usersModel')




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




const handleRegister = async (req, res) => {
    const { username, email, password, role } = req.body


    if (!username || !email || !password || !role) {
        res.status(400).json({ error: 'Missing required fields: Username, Email, Password and Role are all required.' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        const { data, error } = await registerUser(username, email, hashedPassword, role)

        if (error) {
            throw error
        } else {
            res.status(201).json({ message: 'User registered successfully.' })
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to register new user. Please try again later.' })
    }
}











module.exports = {
    handleRegister
}