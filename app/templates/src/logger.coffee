winston     = require "winston"
nodeModule  = require "module"
path        = require "path"

# Detect our base path
#
baseDir   = path.dirname( nodeModule.uri )
logDir    = path.resolve( "#{baseDir}/log/" )
logFile   = "#{logDir}/api.log"

console.log( "[LOGGER] Logging to: " + logFile )

logger = new winston.Logger(
    transports: [
        new ( winston.transports.Console)()
        new ( winston.transports.DailyRotateFile)(
            filename:       logFile
            colorize:       true
            prettyPrint:    true
            json:           false
            timestamp:      true
        )
    ]
)

module.exports = logger