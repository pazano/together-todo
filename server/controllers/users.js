const User = require('../db/models/user');
const utils = require('../db/utils');
const auth = require('../db/utils/auth');

module.exports = {
  get: (req, res) => {
    let {login} = req.query;
    User.find()
      .exec()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send('Not Found'));
  },
  create: (req, res) => {
    let {login, password} = req.body;
    auth.register(login, password)
      .then(result => res.status(201).send(result))
      .catch(err => res.status(400).send(err))
  },
  update: (req, res) => {
    // TODO
    res.status(201).send('UPDATED');
  },
  delete: (req, res) => {
    // TODO
    res.status(200).send('REMOVED');
  }
}