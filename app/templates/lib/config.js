var configFilename, fs, jsonfile, logger, nodeEnvironment, settings, templateFilename, _;

fs = require("fs");

jsonfile = require("jsonfile");

settings = require("madlib-settings");

_ = require("lodash");

logger = require("./logger");

configFilename = "config.json";

templateFilename = "lib/config-template.json";

nodeEnvironment = process.env.NODE_ENV;

if (fs.existsSync("config-" + nodeEnvironment + ".json")) {
  configFilename = "config-" + nodeEnvironment + ".json";
}

if (fs.existsSync("lib/config-template-" + nodeEnvironment + ".json")) {
  templateFilename = "config-template-" + nodeEnvironment + ".json";
}

settings.reload = function() {
  var logLevel;
  settings._setRaw(_.merge({}, jsonfile.readFileSync(templateFilename), jsonfile.readFileSync(configFilename)));
  logLevel = settings.get("log-level", "info");
  logger.level(logLevel);
  return logger.debug("[CONFIG] Current log level: " + (logLevel.toUpperCase()));
};

settings.save = function() {
  logger.info("[CONFIG] Writing settings to disk", configFilename);
  return jsonfile.writeFileSync(configFilename, settings._raw());
};

if (fs.existsSync(configFilename)) {
  logger.info("[CONFIG] Loading settings from disk", configFilename);
  settings.reload();
} else {
  settings._setRaw(jsonfile.readFileSync(templateFilename));
  settings.save();
}

if (settings.get("reload-config-runtime") === true) {
  fs.watchFile(configFilename, function(mtimeCurrent, mtimePrevious) {
    logger.info("[CONFIG] Reloading config due to file change", configFilename);
    return settings.reload();
  });
}

module.exports = settings;
