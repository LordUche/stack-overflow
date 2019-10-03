import { Router } from 'express';
import authRoutes from './auth.routes';
import questionRoutes from './question.routes'

const router = Router();

router.use('/auth', authRoutes);
router.use('/questions', questionRoutes);

export default router;
