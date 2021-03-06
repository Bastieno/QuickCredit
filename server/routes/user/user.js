import { Router } from 'express';
import UserController from '../../controllers/userController';
import validations from '../../middleware/userValidation';
import authMiddleware from '../../middleware/auth';

const auth = Router();
const users = Router();

const { verifyToken, verifyLoginToken, adminOnly } = authMiddleware;

const {
  validateLogin,
  validateSignup,
  validateUserEmail,
  validateVerifyUser,
  validateDeleteUser,
  validateResetPassword,
  validateUpdateRole,
  validationHandler,
} = validations;

const {
  loginUser,
  createUser,
  getAllUsers,
  getSingleUser,
  adminVerifyUser,
  deleteUser,
  resetPassword,
  updateRole
} = UserController;

// Router to create user account
auth.post('/signup', [validateSignup, validationHandler], createUser);

// Router to login user account
auth.post('/signin', [verifyLoginToken, validateLogin, validationHandler], loginUser);

// Router to get all users in the data store
users.get('/', [verifyToken, adminOnly], getAllUsers);

// Router to get a single user from the users array
users.get('/:userEmail', [verifyToken, adminOnly, validateUserEmail, validationHandler], getSingleUser);

// Router to mark a user as verified
users.patch('/:userEmail/verify', [verifyToken, adminOnly, validateVerifyUser, validationHandler], adminVerifyUser);

// Router to update the role of a user
users.patch('/:userEmail/update_role', [verifyToken, adminOnly, validateUpdateRole, validationHandler], updateRole);

// Router to delete a user
users.delete('/:userEmail/delete', [verifyToken, adminOnly, validateDeleteUser, validationHandler], deleteUser);

// Router to reset password
users.post('/:userEmail/reset_password', [validateResetPassword, validationHandler], resetPassword);

export { auth, users };
