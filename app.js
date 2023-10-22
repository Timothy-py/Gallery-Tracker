require("dotenv").config();
const express = require("express");

const app = express();
const APP_PORT = process.env.APP_PORT;

// ROUTES

// MIDDLEWARES
app.use(express.json());

// SET ROUTES


app.listen(APP_PORT, () => {
  console.log("Server is running on PORT: ", APP_PORT);
});

module.exports = app;
