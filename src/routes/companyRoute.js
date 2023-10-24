const companyRouter = require("express").Router();
const {
  registerCompany,
  signinCompany,
} = require("../controllers/companyController");

companyRouter.post("/register", registerCompany);

companyRouter.post("/signin", signinCompany);

module.exports = companyRouter;
