const { viewImage } = require("../controllers/eventController");
const userGuard = require("../middlewares/userGuard");

const eventRouter = require("express").Router();

eventRouter.post("/view", userGuard, viewImage);

module.exports = eventRouter;
