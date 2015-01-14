module.exports =
    id: "<%= routeName %>Response"
    properties:
        id:
            type:           "integer"
            format:         "int64"
            required:       true
            description:    "An id value"
        stringValue:
            type:           "string"
            description:    "A string value"
            required:       true
        booleanValue:
            type:           "boolean"
            defaultValue:   "false"
            required:       true
            description:    "A boolean value. Defaults to false"
        enumValue:
            type:           "string"
            defaultValue:   "a"
            format:         ""
            description:    "An enum (string) value"
            enum:           [ "a", "b", "c", "d" ]
            required:       true
        modelValue:
            $ref:           "someModel"
            description:    "A reference to another model by id"
            required:       false
