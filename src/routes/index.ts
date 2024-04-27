import express, { Request, Response } from "express";
import { body } from "express-validator";

// * Controller Import
import registerController from "../controllers/auth/registeration.contoller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my music player" });
});

router.post(
  "/register",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is required")
      .if(body("firstName").exists())
      .isString()
      .withMessage("First name must be a string")
      .isLength({ min: 3, max: 65 })
      .withMessage("First name must be between 3 and 65 characters long"),
    body("lastName")
      .optional()
      .isString()
      .withMessage("Last name must be a string")
      .isLength({ min: 3, max: 65 })
      .withMessage("Last name must be between 3 and 65 characters long"),
    body("email", "Email is required")
      .notEmpty()
      .withMessage("Email is required")
      .if(body("email").exists())
      .isString()
      .withMessage("Email must be a string")
      .isEmail()
      .withMessage("Invalid email"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .if(body("password").exists())
      .isString()
      .withMessage("Password must be a string")
      .isLength({ min: 8 })
      .withMessage("Password length should be greater than 8 characters"),
    body("dateOfBirth")
      .notEmpty()
      .withMessage("Date of Birth is required")
      .if(body("dateOfBirth").exists())
      .isDate({
        format: "YYYY-MM-DD",
      }),
    body("gender")
      .optional()
      .isIn(["male", "female", "other", "donotdisclose"])
      .withMessage("Gender must be either male, female or other"),
  ],
  registerController
);

export default router;
