import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import User from "./User";

const OTP = sequelize.define("OTP", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
  userID: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default OTP;
