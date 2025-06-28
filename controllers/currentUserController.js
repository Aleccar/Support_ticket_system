const getMe = async (req, res) => {
    try {
        res.json({user: req.user})
    } catch (error) {
        res.status(500).json({error: 'Could not retrieve user information at this time. Try again later.'})
    }
}


module.exports = {
    getMe
}