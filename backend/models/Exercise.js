const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: String,
    isTimed: Boolean,
    userId: String
})

module.exports = mongoose.model('Exercise', exerciseSchema);