fs          = require "fs"
jsonfile    = require "jsonfile"
objectUtils = require "madlib-object-utils"
config

configManager =
    get: ( key ) ->
        return objectUtils.getValue( key, config )

    reload: () ->
        config = jsonfile.readFileSync( "config.json" )

# Initial check if the configuration file exists
#
if fs.existsSync( "config.json" )
    config = jsonfile.readFileSync( "config.json" )

else
    # Use the template file to create a new configuration
    #
    config = jsonfile.readFileSync( "src/config-template.json" )

    # Write the new configuration to disk in one go
    #
    jsonfile.writeFileSync( "config.json", config )


# Expose the configuration management module
#
module.exports = configManager