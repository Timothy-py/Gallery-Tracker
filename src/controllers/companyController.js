const logger = require("../../logger/logger");
const Auth = require("../models/authModel");
const Company = require("../models/companyModel");
const sendTokenResponse = require("../utils/tokenResponse");
const { validateCreateCompany, validateSignin } = require("../utils/validators");

/**
 * @author Timothy <>
 * @description Company registration`
 * @route `/api/v1/companies/register`
 * @access Public
 * @type POST
 */
exports.registerCompany = async (req, res) => {
  try {
    // validate the request body
    const { error, value } = validateCreateCompany(req.body);
    if (error) return res.status(400).send(error.details);

    const { email, password, name, one_line_pitch } = value;

    // check if company exist
    const checkAccount = await Auth.findOne({
      email: email,
      _companyID: { $exists: true },
    });

    if (checkAccount)
      return res.status(409).json({
        status: "fail",
        data: { message: "A company account with that email already exist" },
      });

    // create an authentication profile
    const authProfile = new Auth({ email, password });
    await authProfile.save();

    // create company
    const newCompany = new Company({
      name,
      one_line_pitch,
      _authId: authProfile._id,
    });
    await newCompany.save();

    await Auth.findOneAndUpdate(
      { _id: authProfile._id },
      { _companyID: newCompany._id }
    );

    logger.info(`Company resource: New company created - ${newCompany}`);
    return res.status(201).json({ status: "success", data: newCompany });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({
        status: "fail",
        data: { message: "A company account with that name already exist" },
      });
    logger.error(
      `Company resource: Unable to create company - ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "Unable to create company",
      error: error,
    });
  }
};

/**
 * @author Timothy <>
 * @description Company login`
 * @route `/api/v1/companies/signin`
 * @access Public
 * @type POST
 */
exports.signinCompany = async (req, res) => {
  // Validate the request body
  const { error, value } = validateSignin(req.body);
  if (error) return res.status(400).send(error.details);

  const { email, password } = value;

  // Find company
  const authProfile = await Auth.findOne({
    email: email,
    _companyID: { $exists: true },
  });

  if (!authProfile)
    return res
      .status(404)
      .json({ status: "fail", data: { message: "Account does not exist" } });

  // check for password matches
  const isMatch = await authProfile.matchPassword(password);
  if (!isMatch)
    return res
      .status(401)
      .json({ status: "fail", data: { message: "Incorrect password" } });

  // Query company data
  const company = await Company.findOne({ _authId: authProfile._id });

  sendTokenResponse(company, res);
};
