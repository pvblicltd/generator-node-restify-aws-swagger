var _;

_ = require("lodash");

module.exports = function(model, exclude) {
  var format, name, properties, property, type, validation;
  if (exclude == null) {
    exclude = [];
  }
  validation = {};
  properties = model != null ? model.properties : void 0;
  if (properties) {
    for (name in properties) {
      property = properties[name];
      if (!_.contains(exclude, name)) {
        type = property.type;
        format = property.format;
        validation[name] = {
          isRequired: property.required || false,
          scope: "query",
          description: property.description
        };
        if (property["$ref"]) {
          validation[name].isRequired = false;
        }
        switch (type) {
          case "date":
            validation[name].isDate = true;
            break;
          case "string":
            if (property["enum"]) {
              validation[name].isIn = property["enum"];
            }
            switch (format) {
              case "UUID":
                validation[name].isUUID = true;
                break;
              case "UUIDv3":
                validation[name].isUUIDv3 = true;
                break;
              case "UUIDv4":
                validation[name].isUUIDv4 = true;
                break;
              case "url":
                validation[name].isURL = true;
                break;
              case "date":
                validation[name].isDate = true;
                break;
              case "boolean":
                validation[name].isIn = ["true", "false"];
                validation[name].swaggerType = "boolean";
            }
            break;
          case "boolean":
            validation[name].isIn = ["true", "false"];
            validation[name].swaggerType = "boolean";
            break;
          case "integer":
            switch (format) {
              case "int32":
              case "int64":
                validation[name].isNumeric = true;
                break;
              default:
                validation[name].isFloat = true;
            }
        }
        if (property.minimum != null) {
          validation[name].min = property.minimum;
        }
        if (property.maximum != null) {
          validation[name].max = property.maximum;
        }
      }
    }
  }
  return validation;
};
