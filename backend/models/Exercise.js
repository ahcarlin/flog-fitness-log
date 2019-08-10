const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isTimed: Boolean,
    userId: String
})

module.exports = mongoose.model('Exercise', exerciseSchema);