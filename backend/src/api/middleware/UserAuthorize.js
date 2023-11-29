const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}