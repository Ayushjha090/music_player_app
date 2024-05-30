import { NextFunction, Request, Response } from "express";

import GenerateOTP from "../../services/otp/otp.service";

const OTPController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    await GenerateOTP({ email, password });
    return res
      .status(200)
      .send({ message: "OTP sent to registered email address!" });
  } catch (error) {
    next(error);
  }
};

export default OTPController;
