const { Router } = require('express');
const { getUsers, createUser, getUserById } = require('../controllers/user.controller');
const { check } = require('express-validator');

const validateFields =  require('../middlewares/validate-fields');

const router = Router();

router.get('', getUsers);

router.get('/:id', getUserById);

router.post('', [
  check('firstName', 'El nombre debe ser un string').notEmpty().isString(),
  check('lastName', 'El apellido ser un string').notEmpty().isString(),
  check('email', 'El email debe ser un string').notEmpty().isString(),
  check('email', 'El email debe ser valido').isEmail(),
  validateFields
], createUser)

module.exports = router;