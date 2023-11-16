const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    reporter: Object,
    reported: Object,
    reason: String,
    file: [Object]
}, {
    versionKey: false
});

module.exports = mongoose.model('Report', ReportSchema, 'reports');