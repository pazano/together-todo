const User = require('../db/models/user');
const auth = require('../db/utils/auth');

module.exports = {
  get: (req, res) => {
    let {username} = req.query;
    User.find()
      .exec()
      .then(users => res.status(200).send(users))
      .catch(err => res.status(404).send('Not Found'));
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