import { Router } from 'express';
import questionRouter from './questionRouter.js';

const router = new Router();

router.use('/', questionRouter);

export default router;
