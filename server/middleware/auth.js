import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

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

const userOnly = (req, res, next) => {
  const { userId } = req.user;
  if (!userId) {
    return res.status(403).send({
      status: 403,
      error: 'Unauthorized Access. For authenticated users only',
    });
  }
  next();
};

export default { verifyToken, userOnly, adminOnly };
