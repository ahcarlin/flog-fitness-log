const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true, required: true},
  password: {type: String, required: true},
  bodyweight: {type: Number},
  isMetric: {type: Boolean, default: false},
  exercises: [
    {
      name: {type: String, unique: true},
      isTimed: {type: Boolean, default: false},
      personalRecords: [
        {
          repCount: {type: Number, unique: true},
          amount: {type: Number}, 
          date: {type: Date}
        }
      ]
    }
  ],
  workouts: [
    {
      date: {type: Date, required: true, unique: true},
      bodyweightToday: {type: Number},
      exercisesToday: [
        {
          exercise: {type: String},
          data: [ 
            {
              weight: {type: Number},
              reps: {type: Number},
              sets: {type: Number},
              restTime: {type: Number, default: null}
            }
          ]
        }
      ]
    }
  ]
})

module.exports = userSchema