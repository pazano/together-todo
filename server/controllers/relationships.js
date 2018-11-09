const User = require('../db/models/user');
const Relationship = require('../db/models/relationship');
const utils = require('../db/utils');

module.exports = {
  get: (req, res) => {
    let { user } = req.query;
    // TBD whether or not this should be a 1 relationship app
    Relationship.findOne({$or: [{ userOne: user }, { userTwo: user }]})
      .populate('userOne')
      .populate('userTwo')
      .then(result => {
        if (result) {
          res.status(200).send(result)
        } else {
          res.status(200).send(false);
        }
      })
      .catch(err => res.status(404).send(err))
  },
  create: (req, res) => {
    let {userOne, userTwo} = req.body;
    utils.findOrCreate(Relationship,
      {
        $or: [
          { 'userOne': userOne, 'userTwo': userTwo },
          { 'userOne': userTwo, 'userTwo': userOne }
        ]
      },  { 'userOne': userOne, 'userTwo': userTwo })
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