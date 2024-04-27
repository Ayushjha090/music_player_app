const { v4: uuidv4 } = require("uuid");

import { Registration } from "../../types/user";
import User from "../../database/models/User";
import CustomError from "../../utils/CustomError";
import passwordService from "../password/index";

const RegisterUser = async (userDetails: Registration): Promise<void> => {
  try {
    const { email } = userDetails;
    const existingUser = await User.findOne({ where: { email: email } });
    if (existingUser) {
      throw new CustomError(409, "User with this email already exists");
    }
    const { password, ...userDataWithoutPassword } = userDetails;
    const hashedPassword = await passwordService.hashPassword(password);
    const userId = uuidv4();
    const userName = `${
      userDetails.firstName.charAt(0).toUpperCase() +
      userDetails.firstName.slice(1)
    }${userId}`;
    const newUserDetails = {
      ...userDataWithoutPassword,
      password: hashedPassword,
      userName: userName,
      id: userId,
      subscription: "trial",
    };
    const newUser = await User.create({ ...newUserDetails });
  } catch (error) {
    throw error;
  }
};

export default RegisterUser;
