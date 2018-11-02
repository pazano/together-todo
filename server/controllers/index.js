const userCtrl = require('./users');
const todoCtrl = require('./todos');
const goalCtrl = require('./goals');
const relationshipCtrl = require('./relationships');

module.exports = {
  users: userCtrl,
  todos: todoCtrl,
  goals: goalCtrl,
  relationships: relationshipCtrl,
};