import { DataTypes } from "sequelize";
import sequelize from "../sequelize";
import { emit } from "process";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUIDV4,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "Invalid email address",
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8, Infinity],
        msg: "Password must be 8 characters long",
      },
    },
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  subscription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

console.log(User === sequelize.models.User);

export default User;
