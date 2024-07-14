import createSession from "./authentication.service";
import RegisterUserService from "./registration.service";
import meService from "./me.service";

const authService = {
  registerService: RegisterUserService,
  sessionCreationService: createSession,
  meService: meService,
};

export default authService;
