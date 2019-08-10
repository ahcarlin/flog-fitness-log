const graphql = require('graphql');
const User = require('../models/newUser');
const Exercise = require('../models/Exercise');
const PersonalRecord = require('../models/personalRecord');
const Workout = require('../models/workout');
const WorkoutExercise = require('../models/workoutExercise');
const ExerciseData = require('../models/exerciseData');
const graphqlIsoDate = require('graphql-iso-date');

const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLID, 
    GraphQLInt,
    GraphQLFloat, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLBoolean,
    GraphQL
} = graphql;

const { GraphQLDate } = graphqlIsoDate;

const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        bodyweight: { type: GraphQLFloat },
        isMetric: { type: GraphQLBoolean },
        exercises: {
            type: new GraphQLList(ExerciseType),
            resolve(parent, args) {
                return Exercise.find({userId: parent.id});
            }
        },
        workouts: {
            type: new GraphQLList(WorkoutType),
            resolve(parent, args) {
                return Workout.find({userId: parent.id})
            }
        }
    })
});

const ExerciseType = new GraphQLObjectType({
    name: "Exercise",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString},
        isTimed: { type: GraphQLBoolean },
        personalRecords: {
            type: new GraphQLList(PersonalRecordType),
            resolve(parent, args) {
                //console.log(parent)
                return PersonalRecord.find({exerciseId: parent.id})
            }
        }
    })
});

const PersonalRecordType = new GraphQLObjectType({
    name: "PersonalRecord",
    fields: () => ({
        id: { type: GraphQLID },
        repCount: { type: GraphQLInt },
        amount: { type: GraphQLFloat },
        date: { type: GraphQLDate }
    })
});

const WorkoutType = new GraphQLObjectType({
    name: "Workout",
    fields: () => ({
        id: { type: GraphQLID },
        date: { type: GraphQLDate },
        bodyweightToday: { type: GraphQLFloat },
        workoutExercises: {
            type: new GraphQLList(WorkoutExerciseType),
            resolve(parent, args) {
                return WorkoutExercise.find({workoutId: parent.id});
            }
        }
    })
});

const WorkoutExerciseType = new GraphQLObjectType({
    name: "WorkoutExercise",
    fields: () => ({
        name: { type: GraphQLString },
        // exerciseData: {
        //     type: new GraphQLList(ExerciseDataType),
        //     resolve(parent, args) {
        //         console.log(parent)
        //         return ExerciseData.find({workoutExerciseId: parent.id});
        //     }
        // }
        exerciseData: {
            type: new GraphQLList(ExerciseDataType)
        }
    })
});

const ExerciseDataType = new GraphQLObjectType({
    name: "ExerciseData",
    fields: () => ({
        weight: { type: GraphQLFloat },
        reps: { type: GraphQLInt },
        sets: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLID }},
            resolve(parent, args) {
                return User.findById(args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({});
            }
        },
        exercises: {
            type: new GraphQLList(ExerciseType),
            resolve(parent, args) {
                return Exercise.find();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})