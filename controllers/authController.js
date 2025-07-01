const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { registerUser, loginUser } = require('../models/userModel')


const handleRegister = async (req, res, next) => {
    const { username, email, password, role } = req.body

    if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields: Username, Email, Password and Role are all required.' })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await registerUser(username, email, hashedPassword, role)
        return res.status(201).json({ message: `User "${user.username}" registered successfully.` })

    } catch (error) {
        next(error)
    }
}


const handleLogin = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required fields: email and password are both required.' })
    }

    try {
        const user = await loginUser(email)
        const matchingPassword = await bcrypt.compare(password, user.password)
        if (!matchingPassword) {
            return res.status(401).json({ error: 'Incorrect password.' })
        }

        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }, process.env.JWT_SECRET,
            { expiresIn: '3h' }
        )
        return res.status(200).json({ token })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    handleRegister,
    handleLogin
}