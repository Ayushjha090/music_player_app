import { configDotenv } from "dotenv";
configDotenv();

const appConfig = {
  PORT: process.env.PORT ? process.env.PORT : 8000,
  DBHOST: process.env.DB_HOST ? process.env.DB_HOST : "localhost",
  DBNAME: process.env.DB_NAME ? process.env.DB_NAME : "",
  DBUSER: process.env.DB_USER ? process.env.DB_USER : "",
  DBPASSWORD: process.env.DB_PASSWORD ? process.env.DB_PASSWORD : "",
};

export default appConfig;
