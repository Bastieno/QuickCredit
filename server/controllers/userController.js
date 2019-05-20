/* eslint-disable no-trailing-spaces */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import generator from 'generate-password';
import pool from '../utils/connection';
import query from '../utils/queries';
import handleResponse from '../utils/responseHandler';
import isEmptyObject from '../utils/isEmptyObject';

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
    try {
      const { email, password } = req.body;

      const foundUser = await pool.query(query.findUserByEmail(email));
      const result = foundUser.rows[0];

      if (!foundUser.rowCount) {
        return res.status(400).send({
          status: 400,
          error: 'Email or password is incorrect',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, result.password);
      if (!isPasswordValid) {
        return res.status(400).send({
          status: 400,
          error: 'Email or password is incorrect',
        });
      }

      const {
        user_id, first_name, last_name, status, is_admin,
      } = result;

      const payload = {
        userId: user_id,
        firstName: first_name,
        lastName: last_name,
        email,
        status,
        isAdmin: is_admin,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

      const feedback = payload;
      feedback.token = token;

      return handleResponse(feedback, next, res, 200, 'Login successfully');
    } catch (error) {
      return error;
    }
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
    try {
      const {
        email, firstName, lastName, password, address,
      } = req.body;
      const status = 'unverified';
      const isAdmin = false;

      const foundUser = await pool.query(query.findUserByEmail(email));

      if (foundUser.rowCount) {
        return res.status(409).send({
          status: 409,
          error: 'Email already exists!',
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const userobject = {
        email,
        firstName,
        lastName,
        password: hashedPassword,
        address,
        status,
        isAdmin,
      };

      const createdUser = await pool.query(query.regUser(userobject));

      const payload = {
        userId: createdUser.rows[0].user_id,
        email,
        status,
        isAdmin,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

      const result = {
        token,
        userId: createdUser.rows[0].user_id,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      };

      return handleResponse(result, next, res, 201, 'User created successfully');
    } catch (error) {
      return error;
    }
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
    try {
      const { rows } = await pool.query(query.getAllUsers());
      return handleResponse(rows, next, res, 200, 'Users retrieved successfully');
    } catch (error) {
      return error;
    }
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
    try {
      const { userEmail } = req.params;
      const foundUser = await pool.query(query.findUserByEmail(userEmail));
      if (!foundUser.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'User not found',
        });
      }
      const result = foundUser.rows[0];
      return handleResponse(result, next, res, 200, 'User retrieved successfully');
    } catch (error) {
      return error;
    }
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
  static async adminVerifyUser(req, res, next) {
    try {
      const { userEmail } = req.params;
      const foundUser = await pool.query(query.findUserByEmail(userEmail));

      if (!foundUser.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'User not found',
        });
      }

      if (foundUser.rows[0].status === 'verified') {
        return res.status(404).send({
          status: 409,
          error: 'This user is verified already!',
        });
      }

      const result = await pool.query(query.updateUserStatus('verified', userEmail));
      return handleResponse(result.rows[0], next, res, 200, 'User verified successfully');
    } catch (error) {
      return error;
    }
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
    try {
      const { userEmail } = req.params;
      const foundUser = await pool.query(query.findUserByEmail(userEmail));

      if (!foundUser.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'User not found',
        });
      }

      const deletedUser = await pool.query(query.deleteUserByEmail(userEmail));
      const result = deletedUser.rows[0];
      return handleResponse(result, next, res, 200, 'User deleted successfully');
    } catch (error) {
      return error;
    }
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
    try {
      // When a user remembers his old password and wants to reset to a new one
      if (req.body && !isEmptyObject(req.body)) {
        const { email, password, newPassword } = req.body;
        const foundUser = await pool.query(query.findUserByEmail(email));
        
        if (!foundUser.rowCount) {
          return res.status(404).send({
            status: 404,
            error: 'User not found',
          });
        }
        const isPasswordMatch = await bcrypt.compare(password, foundUser.rows[0].password);
  
        if (!isPasswordMatch) {
          return res.status(400).send({
            status: 400,
            error: 'Passwords do not match. Try again or generate a random password by leaving all field blank'
          });
        }
  
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const { rows } = await pool.query(query.resetPasswordByEmail(hashedPassword, email));
        const result = rows[0];
        result.password = newPassword;
        return handleResponse(result, next, res, 200, 'User password reset successfully');
      }

      // When the user does not remember his passwword
      const { userEmail } = req.params;
      const foundUser = await pool.query(query.findUserByEmail(userEmail));
      if (!foundUser.rowCount) {
        return res.status(404).send({
          status: 404,
          error: 'User not found',
        });
      }
  
      const newPassword = generator.generate({
        length: 10,
        numbers: true
      });

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const { rows } = await pool.query(query.resetPasswordByEmail(hashedPassword, userEmail));
      const result = rows[0];
      result.password = newPassword;
      return handleResponse(result, next, res, 200, 'User password reset successfully');
    } catch (error) {
      return error;
    }
  }
}

export default UserController;
