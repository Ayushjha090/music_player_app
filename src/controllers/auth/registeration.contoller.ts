import { NextFunction, Request, Response } from "express";

import { Registration } from "../../types/user";
import authService from "../../services/auth";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, gender } =
      req.body;
    const userDetails: Registration = {
      firstName: firstName,
      lastName: lastName ? lastName : null,
      email: email,
      password: password,
      dateOfBirth: dateOfBirth ? dateOfBirth : null,
      gender: gender ? gender : null,
    };
    await authService.registerService(userDetails);
    return res.status(200).send({ message: "User Registered Successfully!" });
  } catch (error) {
    next(error);
  }
};

export default registerController;
