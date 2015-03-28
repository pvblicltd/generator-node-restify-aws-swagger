var Q, versionResponseModel;

Q = require("q");

versionResponseModel = require("../../models/versionResponse");

module.exports = function(server, swagger, logger, implementations) {
  implementations.version = function() {
    var deferred, pkg;
    deferred = Q.defer();
    logger.info("[API] Requested server info");
    pkg = require("../../../package.json");
    deferred.resolve({
      name: pkg.name,
      version: pkg.version,
      description: pkg.description
    });
    return deferred.promise;
  };
  return server.get({
    url: "/version",
    swagger: {
      summary: "Retrieves the server software version",
      notes: "The information is derived from the package.json file",
      nickname: "serverVersion",
      consumes: ["application/json"],
      produces: ["application/json"],
      responseMessages: [
        {
          code: 200,
          message: "Success",
          responseModel: "versionResponse"
        }
      ]
    },
    validation: {},
    models: {
      versionResponse: versionResponseModel
    }
  }, function(request, response, next) {
    return implementations.version().then(function(data) {
      return response.send(200, data);
    }, function(error) {
      return response.send(error.code || 500, error.message || error);
    });
  });
};
