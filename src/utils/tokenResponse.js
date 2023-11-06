const sendTokenResponse = (model, res) => {
  // Create token
  const token = model.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "PRODUCTION") options.secure = true;

  return res
    .status(200)
    .cookie("token", token, options)
    .json({ status: "success", data: { token, model } });
};

module.exports = sendTokenResponse;