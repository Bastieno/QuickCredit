import { Router } from 'express';
import expressValidator from 'express-validator';
import UserController from '../controllers/userController';
import validate from '../middleware/userValidation';


const router = Router();

router.use(expressValidator());

const { userSignup } = UserController;
const { signupValidator, emailExist } = validate;

// Router to create user account
router.post('/api/v1/auth/signup', [signupValidator, emailExist], userSignup);

export default router;
