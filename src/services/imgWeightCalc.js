const logger = require("../../logger/logger");
const Image = require("../models/imageModel");

const imgWeightCalc = async (imageId, eventType) => {
  try {
    const score = eventType === "click" ? 7 : 1;
    await Image.findByIdAndUpdate(imageId, {
      $inc: { "metadata.weight": score },
    });
    return true;
  } catch (error) {
    logger.error(`Error calculating image weight - ${error}`);
    return false;
  }
};

module.exports = imgWeightCalc;
