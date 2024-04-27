import { NextFunction, Request, Response } from "express";

import { validationResult } from "express-validator";

const registerController = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    return res.status(200).send({ message: "User Registered Successfully!" });
  } catch (err) {
    next(err);
  }
};

export default registerController;
