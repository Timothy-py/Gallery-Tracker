const logger = require("../../logger/logger");
const Company = require("../models/companyModel");
const { validateCreateCompany } = require("../utils/validators");

exports.createCompany = async (req, res) => {
  try {
    // validate the request body
    const { error, value } = validateCreateCompany(req.body);
    if (error) return res.status(400).send(error.details);

    const { name, one_line_pitch } = value;

    // create company
    const newCompany = new Company({ name, one_line_pitch });

    // save to DB
    const data = await newCompany.save();

    logger.info(`Company resource: New company created - ${data._id}`);
    return res.status(201).json({ status: "success", data: data });
  } catch (error) {
    logger.error(
      `Company resource: Unable to create company - ${error.message}`
    );
    return res
      .status(500)
      .json({
        status: "error",
        message: "Unable to create company",
        error: error,
      });
  }
};
