const logger = require("../../logger/logger");
const Image = require("../models/imageModel");
const { resize } = require("../utils/img-processor");
const randomImageNameGenerator = require("../utils/nameGenerator");
const { s3_upload } = require("../utils/s3-client");
const { validateImageUpload } = require("../utils/validators");

/**
 * @author Timothy <>
 * @description Image upload`
 * @route `/api/v1//images/upload`
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

    const params = {
      Bucket: BUCKET_NAME,
      Key: imageName,
      Body: resizedImg,
      ContentType: img.mimetype,
    };

    await s3_upload(params);
    logger.info(`${img.originalname} uploaded to s3 successfully`);

    // save image data to DB
    const newImage = new Image({
      _companyId: req.company._id,
      imageUrl: imageName,
      metadata: {
        title: title,
        description: description,
      },
    });
    await newImage.save();

    logger.info(`Image uploaded and saved successfully - ${imageName}`);
    return res.status(200).json({ status: "success", data: newImage });
  } catch (error) {
    logger.error(`Unable to upload image - ${error}`);
    return res.status(500).json({
      status: "error",
      message: "Unable to upload image",
      error: error.message,
    });
  }
};
