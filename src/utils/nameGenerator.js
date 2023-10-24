const crypto = require("crypto");

const randomImageNameGenerator = (bytes = 32) => {
  return crypto.randomBytes(bytes).toString("hex");
};

module.exports = randomImageNameGenerator;
