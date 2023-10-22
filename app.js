require("dotenv").config();
const express = require("express");

const connectDB = require("./src/services/connectDB");
const logger = require("./logger/logger");

const app = express();
const APP_PORT = process.env.APP_PORT;

// ROUTES
const authRoutes = require("./src/routes/authRoute");
const companyRoutes = require("./src/routes/companyRoute");

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/companies", companyRoutes);

// CONNECT DATABASE
connectDB();

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`);
});

module.exports = app;
