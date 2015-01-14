Q               = require "q"
logger          = require "../logger"
config          = require "../config"

module.exports = class Database
    connection: null

    constructor: () ->
        # Store a few configuration values for convenience
        #
        @port     = config.get( "database-port"     )
        @hostname = config.get( "database-host"     )
        @user     = config.get( "database-username" )
        @password = config.get( "database-password" )

    connect: ( options ) ->
        # Connect to your database here
        #
        # **TODO**

        return @initializeDatabases( options )

    initializeDatabases: ( options ) ->
        deferred = Q.defer()

        # Perform whatever database create/sanity checks you have to do here
        #

        # The options are the command-line parameters passed to index.js
        # You could use these options to explicitly re-create tables for instance
        #
        if _.indexOf( options, "--createTables" ) isnt -1
            logger.info( "[DATABASE] Creating all tables as instructed" )
            # **TODO**

        # Resolve your promise when all is ready
        #
        deferred.resolve()

        return deferred.promise


