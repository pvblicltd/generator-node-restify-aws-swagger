var Database, Q, config, logger;

Q = require("q");

logger = require("../logger");

config = require("../config");

module.exports = Database = (function() {
  Database.prototype.connection = null;

  function Database() {
    this.port = config.get("database-port");
    this.hostname = config.get("database-host");
    this.user = config.get("database-username");
    this.password = config.get("database-password");
  }

  Database.prototype.connect = function(options) {
    return this.initializeDatabases(options);
  };

  Database.prototype.initializeDatabases = function(options) {
    var deferred;
    deferred = Q.defer();
    if (_.indexOf(options, "--createTables") !== -1) {
      logger.info("[DATABASE] Creating all tables as instructed");
    }
    deferred.resolve();
    return deferred.promise;
  };

  return Database;

})();
