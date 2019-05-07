import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import users from '../models/user';
import handleResponse from '../utils/responseHandler';

dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;

/**
 *
 * @description Represent a collection of route handlers
 * @class UserController
 */
class UserController {
  /**
   *
   * @description Login the user and send a token response
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next Call the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof UserController
   */
  static async loginUser(req, res, next) {
    const { email, password } = req.body;

    const foundUser = users.find(user => user.email === email);

    if (!foundUser) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        status: 400,
        error: 'Email or password is incorrect',
      });
    }

    const {
      id, firstName, lastName, status, isAdmin,
    } = foundUser;

    const payload = {
      id,
      firstName,
      lastName,
      email,
      status,
      isAdmin,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    const result = {
      token,
      id,
      firstName,
      lastName,
      email,
    };

    return handleResponse(result, next, res, 200, 'Login successfully');
  }

  /**
   *
   * @description Create a new user
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof UserController
   */
  static async createUser(req, res, next) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;

    const id = users.length + 1;
    const status = 'unverified';
    const isAdmin = false;


    const foundUser = users.find(user => user.email === email);

    if (foundUser) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exists!',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = {
      id,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      address,
      status,
      isAdmin,
    };

    const payload = {
      id,
      email,
      status,
      isAdmin,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

    const result = {
      token,
      id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };

    users.push(createdUser);

    return handleResponse(result, next, res, 201, 'User created successfully');
  }

  /**
   *
   * @description Gets all registered users
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {array} List of all user objects
   * @memberof UserController
   */
  static async getAllUsers(req, res, next) {
    const result = await users;
    return handleResponse(result, next, res, 200, 'Users retrieved successfully');
  }

  /**
   *
   * @description Retrieves a single registered user account in the data store
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} A user account information
   * @memberof UserController
   */
  static async getSingleUser(req, res, next) {
    const { userId } = req.params;
    const foundUser = await users.find(user => user.id === parseInt(userId, 10));
    if (!foundUser) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }
    const result = foundUser;
    return handleResponse(result, next, res, 200, 'User retrieved successfully');
  }

  /**
   *
   * @description Modify user's status
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} Updated user object
   * @memberof UserController
   */
  static async verifyUser(req, res, next) {
    const { userEmail } = req.params;
    const foundUser = await users.find(user => user.email === userEmail);
    if (!foundUser) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }
    foundUser.status = 'verified';

    const result = foundUser;
    return handleResponse(result, next, res, 200, 'User verified successfully');
  }

  /**
   *
   * @description Deletes a  user's account
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof UserController
   */
  static async deleteUser(req, res, next) {
    const { userEmail } = req.params;
    const foundUser = users.find(user => user.email === userEmail);
    const userIndex = users.findIndex(user => user.email === userEmail);

    if (!foundUser) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }

    const deletedUser = users.splice(userIndex, 1);
    const result = deletedUser;
    return handleResponse(result, next, res, 200, 'User deleted successfully');
  }

  /**
   *
   * @description Reset a user's password
   * @static
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @param {object} next calls the next middleware in the request-response cycle
   * @returns {object} JSON API Response
   * @memberof UserController
   */
  static async resetPassword(req, res, next) {
    const { email, newPassword } = req.body;
    const foundUser = users.find(user => user.email === email);

    if (!foundUser) {
      return res.status(404).send({
        status: 404,
        error: 'User not found',
      });
    }

    foundUser.password = await bcrypt.hash(newPassword, 10);
    const result = foundUser;
    return handleResponse(result, next, res, 201, 'Your Password has been reset successfully');
  }
}

export default UserController;
