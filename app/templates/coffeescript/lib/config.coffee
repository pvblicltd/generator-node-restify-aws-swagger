fs          = require "fs"
jsonfile    = require "jsonfile"
settings    = require "madlib-settings"
_           = require "lodash"
logger      = require "./logger"

# The NODE_ENV environment variable can be used to load an alternative config file and template
#
configFilename    = "config.json"
templateFilename  = "lib/config-template.json"
nodeEnvironment   = process.env.NODE_ENV
configFilename    = "config-#{nodeEnvironment}.json" if fs.existsSync( "config-#{nodeEnvironment}.json"              )
templateFilename  = "config-#{nodeEnvironment}.json" if fs.existsSync( "lib/config-template-#{nodeEnvironment}.json" )

# Madlib-settings provides us with the interface we need for general settings
# management. We just need to amend it with save/reload support
#
settings.reload = () ->
    # Reload and merge with the template config
    #
    settings._setRaw( _.merge( {}, jsonfile.readFileSync( templateFilename ), jsonfile.readFileSync( configFilename ) ) )

settings.save = () ->
    logger.info( "[CONFIG] Writing settings to disk", configFilename )
    jsonfile.writeFileSync( configFilename, settings._raw() )

# Initial check if the configuration file exists
#
if fs.existsSync( configFilename )
    logger.info( "[CONFIG] Loading settings from disk", configFilename )
    settings.reload()

else
    # Use the template file to create a new configuration
    #
    settings._setRaw( jsonfile.readFileSync( templateFilename ) )

    # Write the new configuration to disk
    #
    settings.save()

# Setup file watch for config changes
#
fs.watchFile( configFilename, ( mtimeCurrent, mtimePrevious ) ->
    if settings.get( "reload-config-runtime" ) is true
        logger.info( "[CONFIG] Reloading config due to file change", configFilename )
        settings.reload()
)

# Expose the module
#
module.exports = settings