const Auth = require("../models/authModel");
const User = require("../models/userModel");
const sendTokenResponse = require("../utils/tokenResponse");
const { validateSignup, validateSignin } = require("../utils/validators");
const bcrypt = require("bcryptjs");

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
  const checkAccount = await Auth.findOne({
    email: email,
    _userID: { $exists: true },
  });

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

  await Auth.findOneAndUpdate(
    { _id: authProfile._id },
    { _userID: userProfile._id }
  );

  return res.status(201).json({ status: "success", data: userProfile });
};

/**
 * @author Timothy <>
 * @description User sigin`
 * @route `/api/v1/auth/signin`
 * @access Public
 * @type POST
 */
exports.signin = async (req, res) => {
  // Validate the request body
  const { error, value } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details);

  const { email, password } = value;

  // FInd user
  const authProfile = await Auth.findOne({
    email: email,
    _userID: { $exists: true },
  });
  
  if (!authProfile)
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Account does not exist" } });

  // check if password matches
  const isMatch = await authProfile.matchPassword(password);
  if (!isMatch)
    return res
      .status(401)
      .json({ status: "fail", data: { message: "Incorrect password" } });

  // Query user
  const user = await User.findOne({ _authId: authProfile._id });

  sendTokenResponse(user, res);
};
