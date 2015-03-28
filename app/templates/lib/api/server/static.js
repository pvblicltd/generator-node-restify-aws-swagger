var restify;

restify = require("restify");

module.exports = function(server, swagger, logger) {
  server.get(/\/xdm\/?.*/, restify.serveStatic({
    directory: "./static_content",
    "default": "index.html"
  }));
  return server.get(/\/docs\/?.*/, restify.serveStatic({
    directory: "./static_content",
    "default": "index.html"
  }));
};
