const mongoose = require('mongoose');

// Note:
//      id_table == _id

const TableSchema = new mongoose.Schema({
    id_shop: Object,
    type: 
    {
        size: Number, // Number of seats
        num: Number // Number of tables
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Table', TableSchema, 'tables');