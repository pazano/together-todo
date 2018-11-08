const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../index');
const User = require('./user');
const Goal = require('./goal');
const Relationship = require('./relationship');

const TodoSchema = new Schema({
  relationship: {
    type: Schema.Types.ObjectId,
    ref: 'Relationship'
  },
  goal: {
    type: Schema.Types.ObjectId,
    ref: 'Goal'
  },
  description: String,
    assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  created: {
    type: Date,
    default: Date.now
  },
  complete: {
    type: Boolean,
    default: false
  },
  completionDate: {
    type: Date,
  }
});

const Todo = db.model('Todo', TodoSchema);

module.exports = Todo;