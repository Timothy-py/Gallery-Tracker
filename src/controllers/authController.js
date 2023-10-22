const Auth = require("../models/authModel");
const User = require("../models/userModel");
const { validateSignup } = require("../utils/validators");

/**
 * @author Timothy <>
 * @description User signup`
 * @route `/api/v1/auth/signup`
 * @access Public
 * @type POST
 */
exports.signup = async (req, res) => {
  // Validate the request body
  const { error, value } = validateSignup(req.body);
  if (error) return res.status(400).send(error.details);

  const { email, username, password } = value;

  // check if user exist
  const checkAccount = await Auth.findOne({ email });

  if (checkAccount)
    return res.status(409).json({
      status: "fail",
      data: { message: "An account with that email already exist" },
    });

  //   Create authentication profile
  const authProfile = new Auth({ email, password });
  await authProfile.save();

  // Create user profile
  const userProfile = new User({
    username,
    _authId: authProfile._id,
  });
  await userProfile.save();

  return res.status(201).json({ status: "success", data: userProfile });
};
