const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../index');
const User = require('./user');
const Goal = require('./goal');

const TodoSchema = new Schema({
  relationship: {
    type: Schema.Types.ObjectId,
    ref: 'Relationship'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  description: String,
  complete: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  },
  completionDate: {
    type: Date,
  }
});

const Todo = db.model('Todo', TodoSchema);

module.exports = Todo;