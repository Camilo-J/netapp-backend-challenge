import { NextFunction, Request, Response } from 'express';
import { validateResults } from '../utils/handleValidator';
import { check } from 'express-validator';

const validatorRegister = [
  check('username').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 6, max: 20 }),
  check('name').exists().notEmpty().isLength({ min: 6, max: 20 }),
  check('lastName').exists().notEmpty().isLength({ min: 6, max: 20 }),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const validatorLogin = [
  check('password').exists().notEmpty().isLength({ min: 6, max: 20 }),
  check('email').exists().notEmpty().isEmail(),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const validatorToken = [
  check('refreshToken').exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

export { validatorRegister, validatorLogin, validatorToken };
