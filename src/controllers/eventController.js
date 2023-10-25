const logger = require("../../logger/logger");
const Event = require("../models/eventModel");
const { validateEvent } = require("../utils/validators");

/**
 * @author Timothy <>
 * @description View image`
 * @route `/api/v1//events/view`
 * @access Private to User
 * @type POST
 */
exports.viewImage = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details);

    const { imageId, userId } = value;

    const viewEvent = new Event({
      imageId,
      userId,
      eventType: "view",
    });
    await viewEvent.save();

    logger.info(`Tracked view event - ${viewEvent}`);
    return res.status(201).json({
      status: "success",
      data: { message: "View event tracked successfully" },
    });
  } catch (error) {
    logger.error(`Unable to track view event - ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Unable to track view event",
      error: error.message,
    });
  }
};

/**
 * @author Timothy <>
 * @description Click image`
 * @route `/api/v1//events/click`
 * @access Private to User
 * @type POST
 */
exports.clickImage = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateEvent(req.body);
    if (error) return res.status(400).send(error.details);

    const { imageId, userId } = value;

    const clickEvent = new Event({
      imageId,
      userId,
      eventType: "click",
    });
    await clickEvent.save();

    logger.info(`Tracked click event - ${clickEvent}`);
    return res.status(201).json({
      status: "success",
      data: { message: "Click event tracked successfully" },
    });
  } catch (error) {
    logger.error(`Unable to track click event - ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Unable to track click event",
      error: error.message,
    });
  }
};
