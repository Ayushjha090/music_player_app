import GenerateOTP from "../../services/otp/otp.service";
import authenticationController from "./authentication.controller";
import registerController from "./registeration.contoller";

const authController = {
  registrationController: registerController,
  generateOTPController: GenerateOTP,
  authenticationController: authenticationController,
};

export default authController;
