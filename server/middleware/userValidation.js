import users from '../models/user';

class validate {
  static signupValidator(req, res, next) {
    req
      .checkBody('email')
      .notEmpty()
      .withMessage('Email field is required')
      .trim()
      .isEmail()
      .withMessage('Invalid Email Address Entered!')
      .customSanitizer(email => email.toLowerCase());

    req
      .checkBody('firstName')
      .notEmpty()
      .withMessage('First name field is required')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('First name should be between 2 to 50 characters')
      .isAlpha()
      .withMessage('First name should only contain alphabets');

    req
      .checkBody('lastName')
      .notEmpty()
      .withMessage('Last name field is required')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Last name should be between 2 to 50 characters')
      .isAlpha()
      .withMessage('Last name should only contain alphabets');

    req
      .checkBody('password')
      .notEmpty()
      .withMessage('Password field is required')
      .trim()
      .isLength({ min: 6, max: 255 })
      .withMessage('Password should be between 6 to 255 characters');

    req
      .checkBody('address')
      .notEmpty()
      .withMessage('Address field is required')
      .trim()
      .isLength({ min: 10, max: 255 })
      .withMessage('Address should be between 10 to 255 characters')
      // eslint-disable-next-line no-useless-escape
      .matches(/^[A-Za-z0-9\.\-\s\,]*$/)
      .withMessage('Invalid Address format entered');
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        status: 400,
        error: errors[0].msg,
      });
    }
    return next();
  }

  static emailExist(req, res, next) {
    const { email } = req.body;
    const foundEmail = users.find(user => user.email === email);
    if (foundEmail) {
      return res.status(409).send({
        status: 409,
        error: 'Email already exists!',
      });
    }
    return next();
  }
}

export default validate;