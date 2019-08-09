const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalRecordSchema = new Schema({
    repCount: Number,
    amount: Number,
    date: Date,
    exerciseId: String
})

module.exports = mongoose.model('PersonalRecord', personalRecordSchema);