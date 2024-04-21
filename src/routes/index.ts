import express, { Request, Response } from "express";

// * Controller Import
import registerController from "../controllers/auth/registeration.contoller";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to my music player" });
});

router.post("/register", registerController);

export default router;
