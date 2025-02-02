import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateResults = (req: Request, res: Response, next: NextFunction) => {
  try {
    validationResult(req).throw();
    next();
  } catch (err: any) {
    res.status(403);
    res.json({ errors: err.array() });
  }
};

export { validateResults };
