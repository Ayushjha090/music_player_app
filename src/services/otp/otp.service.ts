const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");

import { OTP } from "../../types/user";
import models from "../../database/models";
import CustomError from "../../utils/CustomError";

const generateOTPObject = () => {
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const expirationTime = new Date().getTime() + 5 * 60000;

  return { otp, expirationTime };
};

const GenerateOTP = async ({ email, password }: OTP): Promise<void> => {
  try {
    const user = await models.userModel.findOne({ where: { email: email } });
    if (!user) {
      throw new CustomError(401, "Invalid credentials");
    }
    const { id: userID, password: userPassword } = user.dataValues;
    const isPasswordValid = await bcrypt.compareSync(password, userPassword);
    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid credentials");
    }
    let otpObject = generateOTPObject();
    let existingOTP = await models.otpModel.findOne({
      where: { userID: userID },
    });
    if (existingOTP) {
      otpObject = generateOTPObject();
      await models.otpModel.update(
        { otp: otpObject.otp, expires_at: otpObject.expirationTime },
        { where: { userID: userID } }
      );
    } else {
      const newOTPDetails = {
        id: uuidv4(),
        userID: userID,
        otp: otpObject.otp,
        expires_at: otpObject.expirationTime,
      };
      const newOTP = await models.otpModel.create({ ...newOTPDetails });
    }
  } catch (error) {
    throw error;
  }
};

export default GenerateOTP;
