import Joi, { Schema } from "joi";

const UserAuthenticationSchema: Schema = Joi.object().keys({
  email: Joi.string().trim().email().message("Invalid email").required(),
  password: Joi.string().trim().required(),
  oneTimePassword: Joi.string()
    .trim()
    .length(6, "One time password must contain 6 characters"),
});

export default UserAuthenticationSchema;
