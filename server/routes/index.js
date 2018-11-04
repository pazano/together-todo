const router = require('express').Router();
const ctrl = require('../controllers');

// Relationships
router.get('/relationships', ctrl.relationships.get);
router.post('/relationships', ctrl.relationships.create);
router.put('/relationships', ctrl.relationships.update);
router.delete('/relationships', ctrl.relationships.delete);

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
router.put('/users', ctrl.users.update);
router.delete('/users', ctrl.users.delete);

// Auth
router.post('/auth/register', ctrl.auth.register);
router.post('/auth/login', ctrl.auth.login);
router.post('/auth/logout', ctrl.auth.logout);

module.exports = router;