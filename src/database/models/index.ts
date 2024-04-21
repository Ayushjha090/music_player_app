import sequelize from "../sequelize";

// Importing Models
import UserModel from "./User";

// Synchronize Model
UserModel.sync({ alter: true });

export default {
  UserModel,
};
