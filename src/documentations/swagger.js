const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const logger = require("../../logger/logger");

const PORT = process.env.APP_PORT;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gallery Tracking Optimizer API",
      version: "1.0.0",
      description: "API documentation for Gallery Tracking Optimizer",
      contact: {
        name: "Timothy",
        email: "adeyeyetimothy33@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${PORT}/api/v1`,
        description: "Development server",
      },
      {
        // description: 'Production server'
      },
    ],
  },
  apis: ["./src/documentations/*.doc.js"], // documentation files
};

const swaggerSpecs = swaggerJsDoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

  app.get("docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpecs);
  });
  logger.info(
    `Dev: Swagger Docs available at http://localhost:${port}/api-docs`
  );
  return;
}

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description OpenAPI Documentation
 */
module.exports = swaggerDocs;
