var config, configManager, fs, jsonfile, objectUtils;

fs = require("fs");

jsonfile = require("jsonfile");

objectUtils = require("madlib-object-utils");

config;

configManager = {
  get: function(key) {
    return objectUtils.getValue(key, config);
  },
  reload: function() {
    var config;
    return config = jsonfile.readFileSync("config.json");
  }
};

if (fs.existsSync("config.json")) {
  config = jsonfile.readFileSync("config.json");
} else {
  config = jsonfile.readFileSync("lib/config-template.json");
  jsonfile.writeFileSync("config.json", config);
}

module.exports = configManager;
