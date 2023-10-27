const { upload, getImages } = require("../controllers/imageController");
const companyGuard = require("../middlewares/companyGuard");
const fileUpload = require("../middlewares/fileUpload");

const imageRouter = require("express").Router();

imageRouter.post("/upload", companyGuard, fileUpload.single("image"), upload);
imageRouter.get('/:companyID', getImages)

module.exports = imageRouter;
