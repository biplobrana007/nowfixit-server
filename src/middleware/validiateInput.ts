import { NextFunction, Request, Response } from "express";

const validateInput =
  (validator: (req: Request) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    validator(req);

    next();
  };

export default validateInput;
