const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutExerciseSchema = new Schema({
    name: String, 
    exerciseId: String,
    workoutId: String
})

module.exports = mongoose.model('WorkoutExercise', workoutExerciseSchema);