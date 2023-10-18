import { Router } from 'express';
import questionController from '../controllers/questionController.js';

const router = new Router();

router.get('/', questionController.getAll);
router.post('/', questionController.create);
router.get('/:id', questionController.getOne);
router.put('/:id', questionController.update);
router.delete('/:id', questionController.remove);

export default router;
