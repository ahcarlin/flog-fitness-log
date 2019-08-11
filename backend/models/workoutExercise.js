const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutExerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    }, 
    exerciseId: {
        type: String,
        required: true
    },
    workoutId: {
        type: String,
        required: true
    },
    exerciseData: [
        {
            weight: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            },
            sets: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model('WorkoutExercise', workoutExerciseSchema);