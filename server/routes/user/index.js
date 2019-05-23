import { Router } from 'express';
import { auth, users } from './user';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to QuickCredit',
  });
});
router.use('/auth', auth);
router.use('/users', users);


export default router;
