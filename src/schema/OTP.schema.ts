import Joi, { Schema } from "joi";

const OTPSchema: Schema = Joi.object().keys({
  email: Joi.string().trim().email().message("Invalid email").required(),
  password: Joi.string().trim().required(),
});

export default OTPSchema;
