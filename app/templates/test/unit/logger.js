var chai;

chai = require("chai");

describe("logger", function() {
  var logger;
  logger = require("../../lib/logger");
  return describe("#log-level", function() {
    it("Default log level is INFO(30)", function() {
      return chai.expect(logger.level()).to.eql(30);
    });
    it("Set log level to DEBUG(20)", function() {
      logger.level("debug");
      return chai.expect(logger.level()).to.eql(20);
    });
    return it("Set log level back to INFO(30)", function() {
      logger.level("info");
      return chai.expect(logger.level()).to.eql(30);
    });
  });
});
