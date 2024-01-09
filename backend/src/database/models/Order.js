const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    id_user: Object,
    id_shop: Object,
    id_table: Object,
    time_start: Date,
    time_end: Date,
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Order', OrderSchema, 'orders');