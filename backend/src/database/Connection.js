const mongoose = require('mongoose');
const { CONNTECTION_STRING } = require('../config');

module.exports = async () => {
    try {
        await mongoose.connect(CONNTECTION_STRING);
        console.log('Database connected');
    } catch (err) {
        console.log('Database connection failed', err);
        process.exit(1);
    }
}