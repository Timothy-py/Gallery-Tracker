const { upload } = require("../controllers/imageController");
const companyGuard = require("../middlewares/companyGuard");
const fileUpload = require("../middlewares/fileUpload");

const imageRouter = require("express").Router();

imageRouter.post("/upload", companyGuard, fileUpload.single("image"), upload);

module.exports = imageRouter;
