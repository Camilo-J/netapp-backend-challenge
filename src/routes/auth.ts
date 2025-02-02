import { validatorLogin, validatorRegister, validatorToken } from '../validations/auth';
import { changePassword, login, logout, register, token } from '../controllers/auth';
import { passportMiddleware } from '../middlewares/passportMiddleware';
import { Router } from 'express';

const router = Router();

router.post('/signup', validatorRegister, register);
router.post('/login', validatorLogin, login);
router.delete('/logout', passportMiddleware, logout);
router.post('/token', validatorToken, passportMiddleware, token);
router.post('/change-password', passportMiddleware, changePassword);

export { router };
