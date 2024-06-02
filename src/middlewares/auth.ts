import { Response, NextFunction } from "express";

import CustomError from "../utils/CustomError";
import { verifyToken } from "../config/jwt";
import models from "../database/models";
import { DecodedToken } from "../types/jwt";
import { AuthenticatedRequest } from "../types/auth";

const authenticationMiddleware = async (
  req: AuthenticatedRequest,
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
    const decodedToken: DecodedToken = verifyToken(token);
    if (!decodedToken) {
      throw new CustomError(401, "Unauthorized request");
    }
    const { userId: userID, id: sessionID } = decodedToken;
    const session = await models.sessionModel.findOne({
      where: { id: sessionID },
    });
    if (!session || !session.dataValues || session.dataValues.revoked) {
      throw new CustomError(401, "Unauthorized request");
    }
    req.user = { userID };
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticationMiddleware;
