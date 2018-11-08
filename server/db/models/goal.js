const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Relationship = require('./relationship');
const db = require('../index');

const GoalSchema = new Schema({
  relationship: {
    type: Schema.Types.ObjectId,
    ref: 'Relationship'
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