# flatiron-final-project

Mobile workout logging app with a notepad-like interface that parses user input using a simple Domain Specific Language. It should be simple to use for everyone, yet allow in-depth data analytics for enthusiasts.

## Functionality

- DSL can differentiate between exercise declarations, weight x reps x sets information, and notes/comments
- User can choose from a list of exercises or create their own
- User can log a new workout or edit an existing one
- User can view history for an exercise, with applicable metric history
- User can track body weight
- Certain metrics will be displayed by default, most will be optional
  - Metrics are based on calculations from existing data, so user can enable/disable at any time


## Domain
- User has many Exercises 
- User has many Workouts
- Many to Many relationship between Workouts & Exercises (WorkoutExercises join class)

But I'm using a non-relational database.

## Technology
React Native, Reactive Native Elements, React Native Navigation, Redux, Node.js, Express, MongoDB

No external APIs

Development will be Android-centric since I don't have an iPhone

## DSL
Example input: 

```
Squat 
135*5
225*3
315*2
365*1
405
-gg ez
365*3*3
- Feeling good today, could definitely do more next time

Bench Press

185*20

Pull-Up
BW*10
BW+45*5
%+90*3

Plank
BW*60s
%/60
```

Any input on a new line that isn't led by a minus sign (-) and isn't numbers & asterisks will be interpreted as an exercise declaration. Autocomplete & autocorrect will be used to check for existing exercises, or the user can create a new exercise.

Lines with numbers & asterisks will be interpreted as data for the last declared exercise in the format Weight x Reps x Sets. Weights without any further information will be interpreted as a single rep of a single set (405x1x1 == 405x1 == 405).

New lines with leading minus signs (-) will be interpreted as comments. Comments at the end of the exercise data will be exercise level; comments within the exercise data will refer to the previous line.

Bodyweight exercises can get the user's bodyweight and plug it in via 'BW' or the % shortcut. Weight can be added to bodyweight. 

Time-based exercises can use a trailing 's' or use the '/' shortcut. 
