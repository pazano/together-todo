const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const db = require('../index');

const RelationshipSchema = new Schema({
  userOne: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userTwo: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Relationship = db.model('Relationship', RelationshipSchema);

module.exports = Goal;