import { NextFunction, Request, Response } from "express";

import createSessionService from "../../services/auth/authentication.service";
import CustomError from "../../utils/CustomError";

const authenticationController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password, oneTimePassword } = req.body;
    const userDetails = await createSessionService({
      email,
      password,
      oneTimePassword,
    });
    if (!userDetails) {
      throw new CustomError(
        500,
        "Unable to process the request, please try again later"
      );
    }
    return res
      .status(200)
      .send({
        error: false,
        data: { userDetails },
        message: "Session created successfully",
      });
  } catch (error) {
    next(error);
  }
};

export default authenticationController;
