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

const validateSignup = validator(signupSchema);

module.exports = {
  validateSignup,
};
