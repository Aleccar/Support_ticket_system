const { getErrorMessage } = require('../utils')


const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(500).json({
        error: {
            message: 
            getErrorMessage(error) ||
            'An error occured. Please view logs for more details.',
        },
    });
}

module.exports = errorHandler
