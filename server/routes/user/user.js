import { Router } from 'express';

import UserController from '../../controllers/userController';
import validations from '../../middleware/userValidation';

const auth = Router();
const users = Router();

const {
  validateLogin,
  validateSignup,
  validationHandler,
} = validations;

const {
  loginUser,
  createUser,
} = UserController;

// Router to create user account
auth.post('/signup', [validateSignup, validationHandler], createUser);

// Router to login user account
auth.post('/signin', [validateLogin, validationHandler], loginUser);

export { auth, users };
