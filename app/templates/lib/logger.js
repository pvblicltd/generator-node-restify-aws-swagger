var baseDir, bunyan, logDir, logFile, logLevel, logger, nodeModule, path;

bunyan = require("bunyan");

nodeModule = require("module");

path = require("path");

baseDir = path.dirname(nodeModule.uri);

logDir = path.resolve(baseDir + "/log/");

logFile = logDir + "/api.log";

logLevel = "info";

logger = bunyan.createLogger({
  name: "api",
  streams: [
    {
      stream: process.stdout,
      level: logLevel
    }, {
      type: "rotating-file",
      path: logFile,
      period: "1d",
      count: 7,
      level: logLevel
    }
  ]
});

module.exports = logger;
