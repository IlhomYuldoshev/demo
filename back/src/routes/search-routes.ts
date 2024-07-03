import express from 'express';
import { userController } from '../controllers/user-controller';
import { checkUserSearchBody } from '../middlewares/check-body';

const router = express.Router();

router.post('/users/find', checkUserSearchBody, userController.findUsers);

export default router;
