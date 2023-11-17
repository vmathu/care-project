const mongoose = require('mongoose');

// Note:
//      id_table == _id

const TableSchema = new mongoose.Schema({
    id_shop: Object,
    type: Number
}, {
    versionKey: false
});

module.exports = mongoose.model('Table', TableSchema, 'tables');