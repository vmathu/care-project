const ErrorHandle = async (error, res, next) => {
    return res.status(error.status).json({ message: error.message });
}

module.exports = ErrorHandle;