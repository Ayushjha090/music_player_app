import Joi, { Schema } from "joi";

import { passwordRegex, dateRegex } from "../utils/constants";

// * Custom validation function to check if the date is valid and less than today's date
const isValidDateOfBirth = (value: string, helpers: Joi.CustomHelpers) => {
  const dateOfBirth = new Date(value);
  const today = new Date();

  // * Check if the date is valid date
  if (isNaN(dateOfBirth.getTime())) {
    return helpers.error("any.invalid");
  }

  // * Check if the date is less than today's date
  if (dateOfBirth >= today) {
    return helpers.error("dateOfBirth.mustBeBeforeToday");
  }

  return value;
};

const UserRegistrationSchema: Schema = Joi.object().keys({
  firstName: Joi.string().trim().min(3).max(65).required(),
  lastName: Joi.string().trim().min(3).max(65).optional(),
  email: Joi.string().trim().email().message("Invalid email").required(),
  password: Joi.string().trim().min(8).regex(passwordRegex).required(),
  dateOfBirth: Joi.string()
    .trim()
    .regex(dateRegex)
    .custom(isValidDateOfBirth)
    .required()
    .optional()
    .messages({
      "any.invalid": "Invalid date of birth format",
      "dateOfBirth.mustBeBeforeToday": "Date of birth must be before today",
    }),
  gender: Joi.string()
    .trim()
    .valid("male", "female", "other", "donotdisclose")
    .optional(),
});

export default UserRegistrationSchema;
