const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

import { Authentication } from "../../types/user";
import models from "../../database/models";
import CustomError from "../../utils/CustomError";
import { signToken } from "../../config/jwt";
import { UserDetails } from "../../types/user";

const createSession = async ({
  email,
  password,
  oneTimePassword,
}: Authentication): Promise<UserDetails | void> => {
  try {
    const user = await models.userModel.findOne({ where: { email } });
    if (!user) {
      throw new CustomError(401, "Invalid credentials");
    }
    const { id: userID, password: userPassword } = user.dataValues;
    const isPasswordValid = await bcrypt.compareSync(password, userPassword);
    if (!isPasswordValid) {
      throw new CustomError(401, "Invalid credentials");
    }
    const otp = await models.otpModel.findOne({ where: { userID } });
    if (!otp) {
      throw new CustomError(
        500,
        "Unable to process the request, please try again later"
      );
    }
    const { otp: userOTP, expires_at } = otp.dataValues;
    const otpExpirationTime = new Date(expires_at).getTime();
    const currentTime = new Date().getTime();
    if (currentTime > otpExpirationTime) {
      throw new CustomError(
        401,
        "Your OTP has expired. Please request a new one."
      );
    } else if (userOTP !== oneTimePassword) {
      throw new CustomError(401, "Invalid One Time Password");
    }
    const sessionID = uuidv4();
    const tokenExpirationTime = new Date(
      new Date().getTime() + 2 * 24 * 60 * 60 * 1000
    );
    const token = signToken({
      id: userID,
      expirationTime: tokenExpirationTime,
    });
    if (!token) {
      throw new CustomError(
        500,
        "Unable to process the request, please try again later"
      );
    }
    const newSessionDetails = {
      id: sessionID,
      userID: userID,
      token: token,
      revoked: false,
      expiresAt: tokenExpirationTime,
    };
    const newSession = await models.sessionModel.create({
      ...newSessionDetails,
    });
    await models.otpModel.destroy({ where: { userID } });
    const { password: userDetailsWithPassword, ...userDetailsWithoutPassword } =
      user.dataValues;
    return { ...userDetailsWithoutPassword, token: token };
  } catch (error) {
    throw error;
  }
};

export default createSession;
