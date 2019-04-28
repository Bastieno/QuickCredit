import users from '../models/user';
import Authenticator from '../auth/authentication';

/**
 * @class UserController
 * @description Contains methods for each user related endpoint
 * @exports UserController
 */

class UserController {
  /**
   * @method userSignup
   * @description creates a user account
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static userSignup(req, res) {
    const {
      email, firstName, lastName, password, address,
    } = req.body;
    const status = 'unverified';
    const isAdmin = 'false';
    const id = users.length + 1;

    const payload = { id, status, isAdmin };

    const token = Authenticator.createToken(payload);

    const data = {
      token,
      id,
      email,
      firstName,
      lastName,
      password: Authenticator.hashPassword(password),
      address,
      status,
      isAdmin,
    };

    const user = {
      id,
      email,
      firstName,
      lastName,
      password: Authenticator.hashPassword(password),
      address,
      status,
      isAdmin,
    };

    users.push(user);
    return res.status(201).send({
      status: 201,
      data,
    });
  }

  /**
   * @method userLogin
   * @description login a user
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static userLogin(req, res) {
    const { email } = req.body;
    const findEmail = users.find(user => user.email === email);
    const index = users.findIndex(user => user.email === email);
    if (findEmail && index !== -1) {
      res.status(200).send({
        message: 'Login Successful!',
        status: 200,
        data: users[index],
      });
    }
  }
}

export default UserController;
