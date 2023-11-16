const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullname: String,
    phone: String,
    role: {
        type: String,
        enum: ['admin', 'user', 'shop'],
        default: 'user'
    },
    favorite: [Object],
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('User', UserSchema, 'users');