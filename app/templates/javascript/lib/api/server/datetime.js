var Q, datetimeResponseModel, moment;

moment = require("moment");

Q = require("q");

datetimeResponseModel = require("../../models/datetimeResponse");

module.exports = function(server, swagger, logger, implementations) {
  implementations.datetime = function() {
    var deferred, now;
    deferred = Q.defer();
    logger.info("[API] Requested server time");
    now = moment();
    deferred.resolve({
      datetime: now.format("X"),
      formatted: now.format("YYYY-MM-DDTHH:mm:ssZ")
    });
    return deferred.promise;
  };
  return server.get({
    url: "/datetime",
    swagger: {
      summary: "Retrieves the current server time",
      notes: "The server time is used for all time registration purposes and should be trusted over the client time.",
      nickname: "serverDatetime",
      consumes: ["application/json"],
      produces: ["application/json"],
      responseMessages: [
        {
          code: 200,
          message: "Success",
          responseModel: "datetimeResponse"
        }
      ]
    },
    validation: {},
    models: datetimeResponseModel
  }, (function(_this) {
    return function(request, response, next) {
      return implementations.datetime().then(function(data) {
        return response.send(200, data);
      }, function(error) {
        return response.send(error.code || 500, error.message || error);
      });
    };
  })(this));
};
