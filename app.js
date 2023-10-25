require("dotenv").config();
const express = require("express");

const connectDB = require("./src/services/connectDB");
const logger = require("./logger/logger");

const app = express();
const APP_PORT = process.env.APP_PORT;

// ROUTES
const authRoutes = require("./src/routes/authRoute");
const companyRoutes = require("./src/routes/companyRoute");
const userRoutes = require("./src/routes/userRoute");
const imageRoutes = require("./src/routes/imageRoute");
const eventRoutes = require("./src/routes/eventRoute");

// MIDDLEWARES
app.use(express.json());

// SET ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/companies", companyRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/images", imageRoutes);
app.use("/api/v1/events", eventRoutes);

// CONNECT DATABASE
connectDB();

app.listen(APP_PORT, () => {
  logger.info(`Server is running on PORT: ${APP_PORT}`);
});

module.exports = app;
