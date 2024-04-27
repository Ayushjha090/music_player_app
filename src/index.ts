import express from "express";
import bodyParser from "body-parser";

// * Custom file imports
import sequelize from "./database/sequelize";
import appConfig from "./config";
import route from "./routes";
import ErrorHandler from "./middlewares/error";

const app = express();

// * Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * Checking database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to database successfully!");
  })
  .catch((error) => {
    console.log("Error connecting database: ", error);
  });

app.use("/", route);

// * Error middleware
app.use(ErrorHandler);

app.listen(appConfig.PORT, () => {
  console.log(`Server is up and running at http://localhost:${appConfig.PORT}`);
});
