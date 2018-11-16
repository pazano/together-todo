const User = require('../db/models/user');
const Todo = require('../db/models/todo');
const Goal = require('../db/models/goal');
const utils = require('../db/utils');


module.exports = {
  get: (req, res) => {
    // TODO:  expand this to search with whatever params are provided in the query
    let { relationship } = req.query;
    Todo
      .find({ relationship })
      .populate('goal')
      .populate('assignedTo')
      .sort('complete -created')
      .exec()
      .then(todosWithGoals => res.status(200).send(todosWithGoals))
      .catch(err => res.status(400).send(err));
  },
  create: (req, res) => {
    let {relationship, user, goal, description} = req.body;
    const query = {
      relationship,
      goal,
      description
    }
    if (user) query.assignedTo = user;
    Todo
      .create(query)
      .then(newTodo => Goal.populate(newTodo, { path: 'goal'}))
      .then(todoWithGoal => User.populate(todoWithGoal, { path: 'assignedTo'}))
      .then(populatedTodo => res.status(200).send(populatedTodo))
      .catch(err => res.status(400).send(err));
  },
  update: (req, res) => {
    let {id, complete} = req.body;
    let updatedValues = {
      complete: complete
    };
    if (complete === true) {
      updatedValues.completionDate = Date.now();
    };
    Todo
      .findByIdAndUpdate(id, updatedValues, {new: true})
        .populate('goal')
        .populate('assignedTo')
        .exec()
        .then(updatedTodo => res.status(201).send(updatedTodo))
        .catch(err => res.status(400).send(err));
  },
  delete: (req, res) => {
    res.status(200).send('REMOVED');
  }
}