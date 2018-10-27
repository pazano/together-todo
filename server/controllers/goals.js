const Goal = require('../db/models/goal');
const Todo = require('../db/models/todo');
const utils = require('../db/utils');
const data = require('../db/utils/data');

module.exports = {
  get: (req, res) => {
    let {user} = req.query;
    data.updateUserGoalScores(user)
      .then(goals => res.status(200).send(goals))
      .catch(err => res.status(400).send(err));
  },
  create: (req, res) => {
    let {user, name, color} = req.body;
    utils.findOrCreate(Goal, {user: user, name: name}, {user: user, name: name, color: color})
      .then(result => res.status(201).send(result))
      .catch(err => res.status(400).send(err));
  },
  update: (req, res) => {
    res.status(201).send('UPDATED');
  },
  delete: (req, res) => {
    let {goal} = req.body;
    utils.deleteRelated(Todo, {goal: goal})
      .then(success => {
        return Goal
          .findByIdAndRemove(goal)
          .exec()
          .then(goalIsGone => res.status(200).send('OK')) // maybe return a message object?
          .catch(err => res.status(500).send(err));
      })
  }
}