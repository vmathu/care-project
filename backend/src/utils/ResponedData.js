require('dotenv').config();
const jwt = require('jsonwebtoken');

const RespondData = (data, message, status) => {
    return {
        data,
        message,
        status
    }
}

const RespondStatus = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
}

const GenerateToken = (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}
module.exports.RespondData = RespondData;
module.exports.RespondStatus = RespondStatus;
module.exports.GenerateToken = GenerateToken;