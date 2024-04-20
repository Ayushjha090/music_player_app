import { Sequelize } from "sequelize";

import appConfig from "../config";

const sequelize = new Sequelize(
  appConfig.DBNAME,
  appConfig.DBUSER,
  appConfig.DBPASSWORD,
  {
    host: appConfig.DBHOST,
    dialect: "mysql",
  }
);

export default sequelize;
