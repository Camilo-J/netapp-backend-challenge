import { Router } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  listUsersController,
  updateUserController
} from '../controllers/user';
import { passportMiddleware } from '../middlewares/passportMiddleware';
import { validatorCreateUser, validatorUpdateUser } from '../validations/user';

const router = Router();

router.get('/', passportMiddleware, listUsersController);
router.post('/', passportMiddleware, validatorCreateUser, createUserController);
router.get('/:id', passportMiddleware, getUserController);
router.patch('/:id', passportMiddleware, validatorUpdateUser, updateUserController);
router.delete('/:id', passportMiddleware, deleteUserController);

export { router };
