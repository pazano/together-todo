const Todo = require('../db/models/todo');
const Goal = require('../db/models/goal');
const utils = require('../db/utils');


module.exports = {
  get: (req, res) => {
    // TODO:  expand this to search with whatever params are provided in the query
    let {user} = req.query;
    Todo
      .find({user: user})
      .sort('complete -created')
      .exec()
      .then(foundTodos => Goal.populate(foundTodos, {path: 'goal'}))
      .then(todosWithGoals => res.status(200).send(todosWithGoals))
      .catch(err => res.status(400).send(err));
  },
  create: (req, res) => {
    let {user, goal, description} = req.body;
    Todo
      .create({
        user: user,
        goal: goal,
        description: description
      })
      .then(newTodo => Goal.populate(newTodo, {path: 'goal'}))
      .then(todoWithGoal => res.status(200).send(todoWithGoal))
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
        .exec()
        .then(updatedTodo => res.status(201).send(updatedTodo))
        .catch(err => res.status(400).send(err));
  },
  delete: (req, res) => {
    res.status(200).send('REMOVED');
  }
}