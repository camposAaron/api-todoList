const { Router } = require('express');
// const { getUsers, createUser, getUserById, getTodos } = require('../controllers/todos.controller');
const { check } = require('express-validator');
const { getTaskByTodoId, addTodo } = require('../controllers/todos.controller');

const validateFields = require('../middlewares/validate-fields');

const router = Router();

router.get('/:id', getTaskByTodoId);

router.post('/:id/task', [
  check('title', 'el titulo es requerido').notEmpty(),
  check('completed', 'el estado de la tarea es requerido').notEmpty(),
  check('completed', 'el estado de la tarea debe ser un booleano').isBoolean(),
  validateFields
], addTodo);

module.exports = router;