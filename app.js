require("dotenv").config();
const express = require("express");

const connectDB = require("./src/services/connectDB");
const logger = require("./logger/logger");

const app = express();
const APP_PORT = process.env.APP_PORT;

// ROUTES
const authRoutes = require("./src/routes/authRoute");

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);

// CONNECT DATABASE
connectDB();

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`)
});

module.exports = app;
