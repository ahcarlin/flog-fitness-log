const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseDataSchema = new Schema({
    workoutExerciseId: String,
    weight: Number,
    reps: Number,
    sets: Number
})

module.exports = mongoose.model('ExerciseData', exerciseDataSchema);