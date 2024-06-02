import { Request, Response, NextFunction } from "express";

import CustomError from "../utils/CustomError";
import { verifyToken } from "../config/jwt";
import models from "../database/models";

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requestHeaderAuthorization = req.headers.authorization;
    if (!requestHeaderAuthorization) {
      throw new CustomError(400, "Authorization header missing");
    }
    const token = requestHeaderAuthorization.split(" ")[1];
    if (!token) {
      throw new CustomError(401, "Unauthorized request");
    }
    const decodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new CustomError(401, "Unauthorized request");
    }
    const userID = decodedToken.id;
    // const session = await models.sessionModel.findOne({where: {}})
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
