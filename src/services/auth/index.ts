import createSession from "./authentication.service";
import RegisterUserService from "./registration.service";

const authService = {
  registerService: RegisterUserService,
  sessionCreationService: createSession,
};

export default authService;
