import { Router } from 'express';
import { create, update } from '../controllers/questions.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/', verifyToken, create);
router.post('/:id/:vote(upvote|downvote)', verifyToken, update);

export default router;
