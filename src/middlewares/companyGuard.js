const jwt = require("jsonwebtoken");
const Company = require("../models/companyModel");

// Company authentication guard for routes
const companyGuard = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // set token from header
    token = req.headers.authorization.split(" ")[1];
  } else if (req.headers.cookie && req.headers.cookie.startsWith("token")) {
    // set token from cookie
    token = req.headers.cookie.split("token=")[1];
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
    req.company = await Company.findById(decoded.company_id);
    if (req.company) {
      next();
    } else {
      return res
        .status(404)
        .json({ status: "fail", message: "Company not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

module.exports = companyGuard;
