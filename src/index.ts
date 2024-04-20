import express from "express";

// * Custom file imports
import sequelize from "./database/sequelize";
import appConfig from "./config";
import route from "./routes";

const app = express();

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

app.listen(appConfig.PORT, () => {
  console.log(`Server is up and running at http://localhost:${appConfig.PORT}`);
});
