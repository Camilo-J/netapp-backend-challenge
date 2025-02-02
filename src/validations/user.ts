import { check } from 'express-validator';
import { validateResults } from '../utils/handleValidator';
import { NextFunction, Request, Response } from 'express';

const validatorCreateUser = [
  check('username').exists().notEmpty().isLength({ min: 3, max: 99 }),
  check('email').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty().isLength({ min: 6, max: 20 }),
  check('name').exists().notEmpty().isLength({ min: 6, max: 20 }),
  check('lastName').exists().notEmpty().isLength({ min: 6, max: 20 }),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

const validatorUpdateUser = [
  check('username').isString().isLength({ min: 3, max: 99 }).optional(),
  check('email').isString().isEmail().optional(),
  check('password').isString().isLength({ min: 6, max: 20 }).optional(),
  check('name').isString().optional(),
  check('lastName').isString().optional(),
  check('refreshToken').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => validateResults(req, res, next)
];

export { validatorCreateUser, validatorUpdateUser };
