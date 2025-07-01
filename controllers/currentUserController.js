const getMe = async (req, res, next) => {
    try {
        res.json({user: req.user})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    getMe
}