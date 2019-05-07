import { Router } from 'express';
import loans from './loan';

const router = Router();
router.use('/loans', loans);

export default router;
