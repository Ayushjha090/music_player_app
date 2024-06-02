import models from "../../database/models";
import { UserDetails } from "../../types/user";
import CustomError from "../../utils/CustomError";

const meService = async (userID: string): Promise<UserDetails | void> => {
  try {
    const user = await models.userModel.findOne({ where: { id: userID } });
    if (!user) {
      throw new CustomError(404, "User not found");
    }
    const { password, ...userDetailsWithouPassword } = user.dataValues;
    return userDetailsWithouPassword;
  } catch (error) {
    throw error;
  }
};

export default meService;
