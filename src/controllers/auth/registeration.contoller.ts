import express, { Request, Response } from "express";

const registerController = (req: Request, res: Response): Response => {
  const requestBody = req.body;
  console.log("requestBody", requestBody);

  return res.status(200).send({ message: "User Registered Successfully!" });
};

export default registerController;
