const logger = require("../../logger/logger");
const { companyImgSort } = require("../services/imgSort");
const eventEmitter = require("./events");

const eventListeners = () => {
  eventEmitter.on("imageUploaded", (data) => {
    companyImgSort(data.companyID);
    logger.info("Executed image uploaded event...");
  });  
}

module.exports = eventListeners;