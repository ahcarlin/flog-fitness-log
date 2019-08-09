const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String,
    bodyweight: Number,
    isMetric: Boolean
})

module.exports = mongoose.model('User', UserSchema);