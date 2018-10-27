const userCtrl = require('./users');
const todoCtrl = require('./todos');
const goalCtrl = require('./goals');

module.exports = {
  users: userCtrl,
  todos: todoCtrl,
  goals: goalCtrl
};