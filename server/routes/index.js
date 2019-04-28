import { Router } from 'express';
import expressValidator from 'express-validator';
import UserController from '../controllers/userController';
import Validate from '../middleware/userValidation';


const router = Router();

router.use(expressValidator());

const { userSignup, userLogin } = UserController;
const { signupValidator, loginValidation, emailExist, loginCheck } = Validate;

// Router to create user account
router.post('/api/v1/auth/signup', [signupValidator, emailExist], userSignup);

// Router to login user account
router.post('/api/v1/auth/signin', [loginValidation, loginCheck], userLogin);

export default router;
