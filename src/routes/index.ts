import express, { Request, Response } from "express";

// * Middleware and Schema Import
import ValidationMiddleware from "../middlewares/validation";
import UserRegistrationSchema from "../schema/userRegistration.schema";
import OTPSchema from "../schema/OTP.schema";

// * Controller Import
import registerController from "../controllers/auth/registeration.contoller";
import OTPController from "../controllers/auth/otp.controller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my music player" });
});

router.post(
  "/register",
  ValidationMiddleware(UserRegistrationSchema, "body"),
  registerController
);

router.post(
  "/auth/otp",
  ValidationMiddleware(OTPSchema, "body"),
  OTPController
);

export default router;
