var API, config, io, logger, restify, swagger, validation;

logger = require("../logger");

config = require("../config");

io = require("socket.io");

restify = require("restify");

validation = require("node-restify-validation");

swagger = require("node-restify-swagger");

module.exports = API = (function() {
  function API() {
    this.port = config.get("api-port");
    this.hostname = config.get("api-host");
    this.protocol = config.get("api-protocol");
    if (NaN === parseInt(this.port, 10)) {
      console.error("Invalid port number");
      process.exit(1);
    }
  }

  API.prototype.start = function() {
    var implementations, server, socketServer;
    server = restify.createServer();
    swagger.configure(server);
    socketServer = io.listen(server);
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.CORS({
      origins: ["*"],
      credentials: true,
      headers: ["Authorization"]
    }));
    server.use(restify.fullResponse());
    server.use(restify.gzipResponse());
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.throttle({
      burst: 100,
      rate: 50,
      ip: true,
      overrides: {
        "localhost": {
          rate: 0,
          burst: 0
        }
      }
    }));
    server.use(validation.validationPlugin({
      errorsAsArray: false
    }));
    swagger.configure(server, {
      info: {
        contact: "admin@localhost",
        description: "<%= packageDescription %>",
        title: "The <%= _.slugify(packageName) %> API"
      }
    });
    implementations = {};
    require("./server/static")(server, swagger, logger, implementations);
    require("./server/version")(server, swagger, logger, implementations);
    require("./server/datetime")(server, swagger, logger, implementations);
    socketServer.on("connection", (function(_this) {
      return function(socket) {
        socket.on("ping", function(data, callback) {
          return callback(null, "pong");
        });
        socket.on("version", function(data, callback) {
          return implementations.version(data).then(function(data) {
            return callback(null, data);
          }, function(error) {
            return callback(error);
          });
        });
        return socket.on("datetime", function(data, callback) {
          return implementations.datetime(data).then(function(data) {
            return callback(null, data);
          }, function(error) {
            return callback(error);
          });
        });
      };
    })(this));
    swagger.loadRestifyRoutes();
    server.on("uncaughtException", function(request, response, route, error) {
      logger.error("[ERROR]", error.stack);
      return response.send(500, "Internal server error");
    });
    logger.info("[API] I'm awake. Listening on " + this.port);
    return server.listen(this.port);
  };

  return API;

})();
