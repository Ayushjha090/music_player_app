// Importing Models
import UserModel from "./User";
import SessionModel from "./Session";

const syncModels = async () => {
  try {
    await UserModel.sync({ alter: true });
    await SessionModel.sync({ alter: true });
  } catch (error) {
    throw error;
  }
};

syncModels();

const models = {
  userModel: UserModel,
  sessionModel: SessionModel,
};

export default models;
