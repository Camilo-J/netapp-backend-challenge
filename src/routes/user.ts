import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController
} from '../controllers/user';

const router = Router();

router.get('/', listUsersController);
router.post('/', createUserController);
router.get('/:id', getUserController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export { router };
