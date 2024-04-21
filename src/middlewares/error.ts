import express, { Request, Response, NextFunction } from "express";
import appConfig from "../config";

const ErrorHandler = (
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Something went wrong";
  return response.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: appConfig.NODE_ENV === "development" ? error.stack : {},
  });
};

export default ErrorHandler;
