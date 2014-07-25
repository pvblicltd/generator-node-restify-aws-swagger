bunyan      = require "bunyan"
nodeModule  = require "module"
path        = require "path"

# Detect our base path
#
baseDir   = path.dirname( nodeModule.uri )
logDir    = path.resolve( "#{baseDir}/log/" )
logFile   = "#{logDir}/api.log"

console.log( "[LOGGER] Logging to: " + logFile )

logger = bunyan.createLogger(
    name:   "api"
    streams: [
        stream:     process.stdout
        level:      "info"
    ,
        type:       "rotating-file",
        path:       logFile,
        period:     "1d",                   # daily rotation
        count:      7                       # keep 7 copies
        level:      "debug"
    ]
)

module.exports = logger