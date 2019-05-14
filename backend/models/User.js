const mongoose = require('mongoose');
const userSchema = require('../schemas/userSchema');
const bcrypt = require('bcrypt-nodejs');

userSchema.pre('save', function(next) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err)
    }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

// don't use a fat arrow function; because you need access to `this`
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err)
    }
    callback(null, isMatch)
  })
}
const ModelClass = mongoose.model('users', userSchema);

let newDate = new Date('2019-01-02T06:00:00.000Z')
let roddyDate = newDate.toDateString()

let otherDate = new Date 
toddyDate = otherDate.toDateString()

ModelClass.find({}, (err, users) => {
  if (err) {
    console.log(err);
  } else if (users.length === 0) {
    const user1 = new ModelClass({
      email: 'roddytoddman@goog.com',
      password: '1234',
      bodyweight: '88',
      isMetric: true,
      exercises: [ 
        {
          name: 'Squat',
          isTimed: false,
          personalRecords: [
            {
              repCount: 1,
              amount: 240,
              date: roddyDate
            },
            {
              repCount: 20,
              amount: 180,
              date: roddyDate
            }
          ]
        },
        {
          name: "Plank",
          isTimed: true,
          personalRecords: [
            {
              repCount: 160,
              amount: 88, 
              date: roddyDate
            }
          ]
        }
      ],
      workouts: [
        {
          date: roddyDate,
          bodyweightToday: 88,
          exercisesToday: [
            {
              exercise: 'Squat',
              data: [ 
                {
                  weight: 180,
                  reps: 20,
                  sets: 1
                },
                {
                  weight: 240,
                  reps: 1,
                  sets: 2
                }
              ] 
            },
            {
              exercise: 'Plank',
              data: [
                {
                  weight: 88, 
                  reps: 160,
                  sets: 3
                }
              ]
            }
          ]
        },
        {
          date: toddyDate,
          bodyweightToday: 87,
          exercisesToday: [
            {
              exercise: 'Squat',
              data: [ 
                {
                  weight: 145,
                  reps: 5,
                  sets: 5
                }
              ] 
            },
            {
              exercise: 'Bench Press',
              data: [
                {
                  weight: 100,
                  reps: 5,
                  sets: 5
                }
              ]
            }
          ]
        }
      ]
  })
    const user2 = new ModelClass({
      email: 'stromkuzewon@goog.com',
      password: '1234',
      bodyweight: 183,
      isMetric: false,
      exercises: [
        {
          name: 'Squat',
          isTimed: false,
          personalRecords: []
        },
        {
          name: 'Bench Press',
          isTimed: false,
          personalRecords: []
        },
        {
          name: 'Deadlift',
          isTimed: false,
          personalRecords: []
        },
        {
          name: 'Plank',
          isTimed: true,
          personalRecords: []
        }
      ],
      workouts: []
    })
    user1.save()
    user2.save()
    console.log('Seeded DB with 2 new users.');
  }
})

//db update test
// User.findOneAndUpdate({email: "stromkuzewon@goog.com"}, {bodyweight: 188}, (err, user) => {
//   if (err) {
//     console.log(err)
//   } else {
//     user.bodyweight = 181
//   }
// })

let myWorkout = {
  date: roddyDate,
  bodyweightToday: 87,
  exercisesToday: [
    {
      exercise: 'Squat',
      data: [ 
        {
          weight: 145,
          reps: 5,
          sets: 5
        }
      ] 
    },
    {
      exercise: 'Bench Press',
      data: [
        {
          weight: 100,
          reps: 5,
          sets: 5
        }
      ]
    }
  ]
}

// test add new workout
// ModelClass.findOneAndUpdate({email: "roddytoddman@goog.com"}, {workouts: myWorkout}, (err, user) => {
//   if (err) {
//     console.log(err)
//   } else {
//     user.workouts.push(myWorkout)
//     user.save()
//   }
// })

module.exports = ModelClass