import express, { Request, Response } from "express";

// * Middleware and Schema Import
import ValidationMiddleware from "../middlewares/validation";
import UserRegistrationSchema from "../schema/userRegistration.schema";

// * Controller Import
import registerController from "../controllers/auth/registeration.contoller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my music player" });
});

router.post(
  "/register",
  ValidationMiddleware(UserRegistrationSchema, "body"),
  registerController
);

export default router;
