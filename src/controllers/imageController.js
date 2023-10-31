const logger = require("../../logger/logger");
const eventEmitter = require("../events/events");
const Company = require("../models/companyModel");
const Image = require("../models/imageModel");
const redis = require("../services/connectRedis");
const { companyImgSort } = require("../services/imgSort");
const { resize } = require("../utils/img-processor");
const randomImageNameGenerator = require("../utils/nameGenerator");
const { s3_upload, s3_signedUrl } = require("../utils/s3-client");
const { validateImageUpload } = require("../utils/validators");

/**
 * @author Timothy <>
 * @description Image upload`
 * @route `/api/v1/images/upload`
 * @access Private to Company
 * @type POST
 */
exports.upload = async (req, res) => {
  try {
    // Validate the request body
    const { error, value } = validateImageUpload(req.body);
    if (error) return res.status(400).send(error.details);

    const { title, description } = value;
    const img = req.file;
    const BUCKET_NAME = process.env.BUCKET_NAME;
    const imageName = randomImageNameGenerator();

    // resize image
    const resizedImg = await resize(img.buffer);

    const uploadParams = {
      Bucket: BUCKET_NAME,
      Key: imageName,
      Body: resizedImg,
      ContentType: img.mimetype,
    };

    const getParams = {
      Bucket: BUCKET_NAME,
      Key: imageName,
    };

    const [, url] = await Promise.all([
      s3_upload(uploadParams),
      s3_signedUrl(getParams),
    ]);

    // save image data to DB
    const newImage = new Image({
      _companyId: req.company._id,
      imageUrl: url,
      metadata: {
        title: title,
        description: description,
      },
    });
    await newImage.save();

    logger.info(`Image uploaded and saved successfully - ${imageName}`);

    // emit event
    eventEmitter.emit("imageUploaded", { companyID: req.company._id });

    return res.status(201).json({ status: "success", data: newImage });
  } catch (error) {
    logger.error(`Unable to upload image - ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Unable to upload image",
      error: error.message,
    });
  }
};

/**
 * @author Timothy <>
 * @description Get images`
 * @route `/api/v1/images/`
 * @access Public
 * @type GET
 */
exports.getImages = async (req, res) => {
  try {
    const { companyID } = req.params;
    const page = req.query.page ? req.query.page : 1;
    const perPage = req.query.perPage ? req.query.perPage : 3;
    const skip = (page - 1) * perPage;

    // check if company exist
    const companyExist = await Company.findById(companyID);
    if (!companyExist)
      return res
        .status(404)
        .json({ status: "fail", data: { message: "Company not found" } });

    // retrieve the sorted images from the cache
    const cachedImages = await redis.get(`sortedImages_${companyID}`);

    if (cachedImages) {
      const sortedImages = JSON.parse(cachedImages);
      const paginatedSortedImages = sortedImages.slice(skip, skip + perPage);
      return res
        .status(200)
        .json({ status: "success", data: paginatedSortedImages });
    } else {
      // fetch from DB
      const paginatedSortedImages = await Image.find({ _companyId: companyID })
        .sort({ "metadata.weight": -1 })
        .skip(skip)
        .limit(perPage);

      // cache data
      await redis.set(
        `sortedImages_${companyID}`,
        JSON.stringify(paginatedSortedImages)
      );

      return res
        .status(200)
        .json({ status: "success", data: paginatedSortedImages });
    }
  } catch (error) {
    logger.error(`Unable to get images - ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Unable to get images",
      error: error.message,
    });
  }
};
