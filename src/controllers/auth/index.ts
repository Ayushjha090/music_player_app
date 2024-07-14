import OTPController from "./otp.controller";
import authenticationController from "./authentication.controller";
import registerController from "./registeration.contoller";
import meController from "./me.controller";

const authController = {
  registrationController: registerController,
  generateOTPController: OTPController,
  authenticationController: authenticationController,
  meController: meController,
};

export default authController;
