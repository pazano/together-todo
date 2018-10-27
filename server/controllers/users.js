const User = require('../db/models/user');
const utils = require('../db/utils');

module.exports = {
  get: (req, res) => {
    User.find().exec()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send('Not Found'));
  },
  create: (req, res) => {
    let {login, password} = req.body;
    utils.findOrCreate(User, {login: login}, {password: password})
      .then(result => res.status(201).send(result))
      .catch(err => res.status(400).send(err))
  },
  update: (req, res) => {
    res.status(201).send('UPDATED');
  },
  delete: (req, res) => {
    res.status(200).send('REMOVED');
  }
}