import Joi, { Schema } from "joi";

import { passwordRegex, dateRegex } from "../utils/constants";

const UserRegistrationSchema: Schema = Joi.object().keys({
  firstName: Joi.string().min(3).max(65).required(),
  lastName: Joi.string().min(3).max(65).optional(),
  email: Joi.string().email().message("Invalid email").required(),
  password: Joi.string().min(8).regex(passwordRegex).required(),
  dateOfBirth: Joi.string().regex(dateRegex).required().optional(),
  gender: Joi.string()
    .valid("male", "female", "other", "donotdisclose")
    .optional(),
});

export default UserRegistrationSchema;
