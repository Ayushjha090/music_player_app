// Importing Models
import UserModel from "./User";
import SessionModel from "./Session";
import OTPModel from "./OTP";

const syncModels = async () => {
  try {
    await UserModel.sync({ alter: true });
    await SessionModel.sync({ alter: true });
    await OTPModel.sync({ alter: true });
  } catch (error) {
    console.log("Error synchronizing database", error);
  }
};

syncModels();

const models = {
  userModel: UserModel,
  sessionModel: SessionModel,
  otpModel: OTPModel,
};

export default models;
