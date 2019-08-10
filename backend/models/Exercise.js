const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isTimed: Boolean,
    userId: String,
    personalRecords: [
        {
            date: Date,
            repCount: {
                type:Number,
                required: true
            },
            amount: {
                type:Number,
                required: true 
            },
        }
    ]
})

module.exports = mongoose.model('Exercise', exerciseSchema);