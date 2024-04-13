import { configDotenv } from "dotenv";
import express, { Request, Response } from "express";

configDotenv();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from music player");
});

app.listen(port, () => {
  console.log(`Server is up and running at http://localhost:${port}`);
});
