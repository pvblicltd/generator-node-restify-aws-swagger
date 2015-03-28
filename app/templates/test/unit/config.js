var chai, config, path;

chai = require("chai");

path = require("path");

config = require("../../lib/config");

describe("config", function() {
  describe("#get", function() {
    it("Should retrieve string config value", function() {
      return chai.expect(config.get("api-host")).to.eql("localhost");
    });
    return it("Should retrieve number config value", function() {
      return chai.expect(config.get("api-port")).to.eql(8080);
    });
  });
  return describe("#set", function() {
    config.set("test-string", "bar");
    config.set("test-number", 42);
    it("Should set string config value", function() {
      return chai.expect(config.get("test-string")).to.eql("bar");
    });
    return it("Should set number config value", function() {
      return chai.expect(config.get("test-number")).to.eql(42);
    });
  });
});
