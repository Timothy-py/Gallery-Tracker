const { viewImage, clickImage } = require("../controllers/eventController");
const userGuard = require("../middlewares/userGuard");

const eventRouter = require("express").Router();

eventRouter.post("/view", userGuard, viewImage);
eventRouter.post("/click", userGuard, clickImage);

module.exports = eventRouter;
