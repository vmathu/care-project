const mongoose = require('mongoose');

const RatingSchema = new mongoose.Schema({
    id_shop: Object,
    id_user: Object,
    rating: Number,
    comment: String,
    file: [Object],
    status: {
        type: String,
        enum: ['active', 'disabled'],
        default: 'active'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Rating', RatingSchema, 'ratings');