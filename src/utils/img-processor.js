const sharp = require("sharp");

// Resize image
const resize = async (buffer) => {
  const data = await sharp(buffer)
    .resize({ height: 1920, width: 1080, fit: "contain" })
    .toBuffer();
  return data;
};

module.exports = {
    resize,
}