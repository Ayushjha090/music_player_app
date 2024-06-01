import Joi, { Schema } from "joi";

const UserAuthenticationSchema: Schema = Joi.object().keys({
  email: Joi.string().trim().email().message("Invalid email").required(),
  password: Joi.string().trim().required(),
  oneTimePassword: Joi.string().trim().required().min(6).max(6),
});

export default UserAuthenticationSchema;
