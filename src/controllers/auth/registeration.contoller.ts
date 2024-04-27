import { NextFunction, Request, Response } from "express";

const registerController = (req: Request, res: Response): Response | void => {
  return res.status(200).send({ message: "User Registered Successfully!" });
};

export default registerController;
