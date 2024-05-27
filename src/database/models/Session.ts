import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import User from "./User";

const Session = sequelize.define("Session", {
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
  token: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  revoked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

export default Session;
