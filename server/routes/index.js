const router = require('express').Router();
const ctrl = require('../controllers');

// Goals
router.get('/goals', ctrl.goals.get);
router.post('/goals', ctrl.goals.create);
router.put('/goals', ctrl.goals.update);
router.delete('/goals', ctrl.goals.delete);

// Todos
router.get('/todos', ctrl.todos.get);
router.post('/todos', ctrl.todos.create);
router.put('/todos', ctrl.todos.update);
router.delete('/todos', ctrl.todos.delete);

// Users
router.get('/users', ctrl.users.get);
router.post('/users', ctrl.users.create);
router.put('/users', ctrl.users.update);
router.delete('/users', ctrl.users.delete);

// Auth

module.exports = router;