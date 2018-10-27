const Goal = require('../models/goal');
const Todo = require('../models/todo');
const moment = require('moment');

const FULL = moment().subtract(1, 'hour');
const MODERATE = moment().subtract(3, 'hours');
const LESS = moment().subtract(12, 'hours');

const calculateScores = (todoList) => {
  let values = todoList.reduce((counts, goal) => {
    if (moment(goal.completionDate) >= FULL) {
      counts.full += 1;
      counts.total += 1;
    } else if (moment(goal.completionDate) >= MODERATE) {
      counts.moderate += 1;
      counts.total += 1;
    } else if (moment(goal.completionDate) >= LESS) {
      counts.low += 1;
      counts.total += 1;
    }
    return counts;
  }, { full: 0, moderate: 0, less: 0, total: 0 });
  let modifier = Math.floor((values.total * 5));
  let score = values.full * 5 + values.moderate * 2 + values.less * 1;
  return (score / modifier) * 100 || 0;
}

const updateGoalScore = (goalId) => {
  return new Promise( (resolve, reject) => {
    Todo
      .find({goal: goalId, complete: true})
      .sort('-completionDate')
      .exec()
      .then(completeTodos => {
        let score = calculateScores(completeTodos);
        return Goal
          .findByIdAndUpdate(goalId, {score: score}, {new: true})
          .exec()
      })
      .then(updatedGoal => resolve(updatedGoal))
      .catch(err => reject(err));
  })
}

const updateUserGoalScores = (userId) => {
  return new Promise( (resolve, reject) => {
    Goal
      .find({user: userId})
      .exec()
      .then(foundGoals => {
        let promises = foundGoals.map(goal => updateGoalScore(goal._id))
        return Promise.all(promises)
      })
      .then(updatedGoals => resolve(updatedGoals))
      .catch(err => reject(err));
  })
}

module.exports = {
  updateGoalScore: updateGoalScore,
  updateUserGoalScores: updateUserGoalScores
}