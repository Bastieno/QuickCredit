import { Router } from 'express';
import UserController from '../../controllers/userController';
import validations from '../../middleware/userValidation';
import authMiddleware from '../../middleware/auth';

const auth = Router();
const users = Router();

const { verifyToken, adminOnly } = authMiddleware;

const {
  validateLogin,
  validateSignup,
  validateUserId,
  validationHandler,
} = validations;

const {
  loginUser,
  createUser,
  getAllUsers,
  getSingleUser,
} = UserController;

// Router to create user account
auth.post('/signup', [validateSignup, validationHandler], createUser);

// Router to login user account
auth.post('/signin', [validateLogin, validationHandler], loginUser);

// Router to get all users in the data store
users.get('/', [verifyToken, adminOnly], getAllUsers);

// Router to get a single user from the users array
users.get('/:userId', [verifyToken, adminOnly, validateUserId, validationHandler], getSingleUser);

export { auth, users };
