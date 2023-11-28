const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
    _id: Object,
    description: String,
    address: 
    {
        street: String,
        district: String,
        city: String,
    },
    time: 
    {
        open: String,
        close: String
    },
    photo: [Object], // Note
    menu: [Object], // Note
    rating: Number,
    tag: [String],
}, {
    versionKey: false
});

module.exports = mongoose.model('Shop', ShopSchema, 'shops');