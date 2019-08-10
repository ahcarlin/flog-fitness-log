const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personalRecordSchema = new Schema({
    repCount: {
        type:Number,
        required: true
    },
    amount: {
        type:Number,
        required: true 
    },
    date: Date,
    exerciseId: String
})

module.exports = mongoose.model('PersonalRecord', personalRecordSchema);