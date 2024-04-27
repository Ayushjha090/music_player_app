import appConfig from "../../config";

const bcrypt = require("bcrypt");

const hashPassword = async (password: string): Promise<void> => {
  try {
    const saltRounds = appConfig.SALTROUND;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

export default hashPassword;
