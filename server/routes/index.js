import { Router } from 'express';
import user from './user';
import loan from './loan';

const router = Router();

// Root handler
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to QuickCredit',
  });
});

router.use('/api/v1', user, loan);

router.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: 'This route does not exist. Recheck parameters.',
  });
});

export default router;
