import { Request, Response, NextFunction } from "express";

import authService from "../../services/auth";
import CustomError from "../../utils/CustomError";
import { AuthenticatedRequest } from "../../types/auth";

const meController = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = req.user;
    if (!user || !user.userID) {
      throw new CustomError(401, "Unauthorized request");
    }
    const userDetails = await authService.meService(user.userID);
    return res
      .status(200)
      .send({ error: false, message: "Success", data: { ...userDetails } });
  } catch (error) {
    next(error);
  }
};

export default meController;
