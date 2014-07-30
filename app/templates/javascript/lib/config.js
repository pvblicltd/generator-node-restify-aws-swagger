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
  templateFilename = "config-" + nodeEnvironment + ".json";
}

settings.reload = function() {
  return settings._setRaw(_.merge({}, jsonfile.readFileSync(templateFilename), jsonfile.readFileSync(configFilename)));
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

fs.watchFile(configFilename, function(mtimeCurrent, mtimePrevious) {
  if (settings.get("reload-config-runtime") === true) {
    logger.info("[CONFIG] Reloading config due to file change", configFilename);
    return settings.reload();
  }
});

module.exports = settings;
