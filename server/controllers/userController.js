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
   * @returns {array} List of all users
   * @memberof UserController
   */
  static async getAllUsers(req, res, next) {
    const result = await users;
    return handleResponse(result, next, res, 200, 'Users retrieved successfully');
  }
}

export default UserController;
