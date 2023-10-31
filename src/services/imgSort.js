const logger = require("../../logger/logger");
const Company = require("../models/companyModel");
const Image = require("../models/imageModel");
const redis = require("./connectRedis");

// Sort images for all the companies in the DB
const imgSort = async () => {
  logger.info("Executing image sort function>>>>>>>>>>>>>>>");
  try {
    // get all the companies ID
    const companies = await Company.find({}, "_id");

    // sort the images associated with the company
    for (let i = 0; i < companies.length; i++) {
      const company = companies[i];

      const sorted = await Image.find({ _companyId: company._id }).sort({
        "metadata.weight": -1,
      });

      // save to cache
      await redis.set(`sortedImages_${company._id}`, JSON.stringify(sorted));
    }

    logger.info("Image sort function executed successfully>>>>>>>>>>>>>");
    return true;
  } catch (error) {
    logger.error(`Error executing image sort function: >>>> ${error}`);
    return false;
  }
};

// Sort images for a specific company
const companyImgSort = async(companyId) => {
  try {
    // confirm that company exist
    const companyExist = await Company.findById(companyId, "name");
    if(!companyExist) return false;

    // sort company images
    const sorted = await Image.find({ _companyId: companyId }).sort({
      "metadata.weight": -1,
    });

    // save to cache
    await redis.set(`sortedImages_${companyId}`, JSON.stringify(sorted));

    logger.info(`Image sort function for company - ${companyExist}  executed successfully>>>>>>>>>>>>>`);
    return true;
  } catch (error) {
    logger.error(`Error executing company image sort function: >>>> ${error}`);
    return false;
  }
}

module.exports = {
  imgSort,
  companyImgSort
}
