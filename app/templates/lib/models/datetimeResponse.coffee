module.exports =
    id: "datetimeResponse"
    properties:
        datetime:
            type:           "integer"
            format:         "int64"
            description:    "Current server time. Format is Unix time-stamp."
            required:       true
        formatted:
            type:           "string"
            description:    "ISO8601 Formatted date time"
            required:       true
