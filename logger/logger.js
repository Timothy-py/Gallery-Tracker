const { createLogger, transports, format } = require('winston');

// Define log levels and their corresponding colors
const logLevels = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
};

// Create a logger instance
const logger = createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.colorize({ all: true }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}] ${message}`;
    })
  ),
  transports: [
    new transports.Console({level: 'error'}), // Log to the console
    // new transports.File({ filename: 'error.log', level: 'error' }), // Log errors to a file
    // new transports.File({ filename: 'combined.log' }), // Log all levels to a separate file
  ],
});

module.exports = logger;
