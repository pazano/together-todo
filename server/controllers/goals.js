const Goal = require('../db/models/goal');
const Todo = require('../db/models/todo');
const utils = require('../db/utils');
const data = require('../db/utils/data');

module.exports = {
  get: (req, res) => {
    let { relationship } = req.query;
    data.updateRelationshipGoalScores(relationship)
      .then(goals => res.status(200).send(goals))
      .catch(err => res.status(400).send(err));
  },
  create: (req, res) => {
    let {relationship, name, color} = req.body;
    utils.findOrCreate(Goal, {relationship, name}, {relationship, name, color})
      .then(result => res.status(201).send(result))
      .catch(err => res.status(400).send(err));
  },
  update: (req, res) => {
    res.status(201).send('NOT A THING YET');
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