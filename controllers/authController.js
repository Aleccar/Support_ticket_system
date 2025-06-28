const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerUser } = require('../models/userModel')




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
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await registerUser(username, email, hashedPassword, role)

        res.status(201).json({ message: `User "${user.username}" registered successfully.` })

    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to register new user. Please try again later.' })
    }
}


const handleLogin = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({error: 'Missing required fields: email and password are both required.'})
    }

    try {
        // Fetch the user to validate login data:
        


    } catch(error) {
        res.status(500).json({error: 'Login failed.'})
    }
}








module.exports = {
    handleRegister
}