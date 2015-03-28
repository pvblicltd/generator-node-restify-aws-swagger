module.exports = {
  id: "versionResponse",
  properties: {
    name: {
      type: "string",
      description: "The server software package name",
      required: true
    },
    version: {
      type: "string",
      description: "The server software version",
      required: true
    },
    description: {
      type: "string",
      description: "The server software description",
      required: true
    }
  }
};
