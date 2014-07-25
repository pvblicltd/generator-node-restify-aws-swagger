var Q, <%= routeName %>ResponseModel, modelValidator;

Q = require("q");

<%= routeName %>ResponseModel = require("../../models/<%= routeName %>Response");

module.exports = function(server, swagger, logger, implementations) {
  var validation;
  implementations.<%= routeName %> = function() {
    var deferred;
    deferred = Q.defer();
    logger.info("[API] Requested <%= routeName %>");
    deferred.resolve();
    return deferred.promise;
  };
  return server.<% routeMethod %>({
    url: "/<% routeSection %>/<%= routeName %>",
    swagger: {
      summary: "<%= routeDescription %>",
      notes: "<%= routeNotes %>",
      nickname: "server<%= routeName %>",
      consumes: ["application/json"],
      produces: ["application/json"],
      responseMessages: [
        {
          code: 200,
          message: "Success",
          responseModel: "<%= routeName %>Response"
        }
      ]
    },
    validation: {},
    models: {
      <%= routeName %>Response: <%= routeName %>ResponseModel
    }
  }, function(request, response, next) {
    return implementations.<%= routeName %>().then(function(data) {
      return response.send(200, data);
    }, function(error) {
      return response.send(error.code || 500, error.message || error);
    });
  });
};
