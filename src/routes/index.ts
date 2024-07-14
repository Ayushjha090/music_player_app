import express, { Request, Response } from "express";

// * Middleware and Schema Import
import ValidationMiddleware from "../middlewares/validation";
import authenticationMiddleware from "../middlewares/auth";
import UserRegistrationSchema from "../schema/userRegistration.schema";
import OTPSchema from "../schema/OTP.schema";
import UserAuthenticationSchema from "../schema/userAuthentication.schema";

// * Controller Import
import authController from "../controllers/auth";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my music player" });
});

router.get("/me", authenticationMiddleware, authController.meController);

router.post(
  "/register",
  ValidationMiddleware(UserRegistrationSchema, "body"),
  authController.registrationController
);

router.post(
  "/auth/otp",
  ValidationMiddleware(OTPSchema, "body"),
  authController.generateOTPController
);

router.post(
  "/login",
  ValidationMiddleware(UserAuthenticationSchema, "body"),
  authController.authenticationController
);

export default router;
