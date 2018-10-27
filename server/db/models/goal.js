const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
const db = require('../index');

const GoalSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: String,
  color: String,
  score: {
    type: Number,
    default: 0
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Goal = db.model('Goal', GoalSchema);

module.exports = Goal;