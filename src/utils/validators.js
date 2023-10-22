const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .required()
    .min(8)
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"))
    .message(
      "Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)"
    ),
});

const createCompanySchema = Joi.object({
  name: Joi.string().required(),
  one_line_pitch: Joi.string()
});

const validateSignup = validator(signupSchema);
const validateSignin = validator(signinSchema);
const validateCreateCompany = validator(createCompanySchema);

module.exports = {
  validateSignup,
  validateSignin,
  validateCreateCompany,
};
