import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from '../utils/connection';
import query from '../utils/queries';
import handleResponse from '../utils/responseHandler';

dotenv.config();
const SECRET_KEY = process.env.JWT_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    return res.status(401).send({
      status: 401,
      error: 'Unauthorised - Header Not Set',
    });
  }
  const bearer = authHeader.split(' ');
  const token = bearer[1];
  jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        error: 'Invalid Token',
      });
    }
    req.user = decodedToken;
    next();
  });
};

const verifyLoginToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (typeof authHeader === 'undefined') {
      return next();
    }
    const bearer = authHeader.split(' ');
    const token = bearer[1];
    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).send({
          status: 401,
          error: 'Invalid Token',
        });
      }
      req.user = decodedToken;
    });
    const { email } = req.user;
    const foundUser = await pool.query(query.findUserByEmail(email));

    if (!foundUser.rowCount) {
      return res.status(400).send({
        status: 400,
        error: 'User not found',
      });
    }
    const { userId, firstName, lastName, status, isAdmin } = req.user;
    const payload = {
      userId,
      firstName,
      lastName,
      email,
      status,
      isAdmin
    };

    const newtoken = jwt.sign(payload, SECRET_KEY, { expiresIn: '8h' });
    const feedback = payload;
    feedback.token = newtoken;
    return handleResponse(feedback, next, res, 200, 'Login successfully');
  } catch (error) {
    return error.stack;
  }
};

const adminOnly = (req, res, next) => {
  const { isAdmin } = req.user;
  if (!isAdmin) {
    return res.status(403).send({
      status: 403,
      error: 'Unauthorized Access. For admins accounts only',
    });
  }
  next();
};

const authValidations = {
  verifyToken,
  verifyLoginToken,
  adminOnly
};

export default authValidations;
