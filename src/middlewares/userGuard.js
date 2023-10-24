const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// User authentication guard for routes
const userGuard = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    // set token from cookie
    token = req.cookies.token;
  }

  // if token does not exist
  if (!token)
    return res
      .status(401)
      .json({ status: "fail", message: "Not authorized to access this route" });

  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    // verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.user_id);
    if (req.user) {
      next();
    } else {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = userGuard;