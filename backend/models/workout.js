const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    date: Date,
    bodyweightToday: Number,
    userId: String
})

module.exports = mongoose.model('Workout', workoutSchema);