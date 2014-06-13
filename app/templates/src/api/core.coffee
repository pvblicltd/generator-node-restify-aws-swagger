# Include required middle-ware
#
logger              = require "../logger"
config              = require "../config"
io                  = require "socket.io"
restify             = require "restify"
validation          = require "node-restify-validation"
swagger             = require "node-restify-swagger"

module.exports = class API
    constructor: () ->
        # Store configuration parameters
        #
        @port     = config.get( "api-port"     )
        @hostname = config.get( "api-host"     )
        @protocol = config.get( "api-protocol" )

        # Check we are listening to a valid port number
        #
        if NaN is parseInt( @port, 10 )
            console.error( "Invalid port number" )
            process.exit( 1 )

    start: () ->

        # Create our restify server and configure the middle-ware
        #
        server = restify.createServer()

        # Setup swagger to expose our API documentation
        #
        swagger.configure( server )

        # Add socket.io support
        #
        socketServer = io.listen( server )

        socketServer.set( "log level", 1 )
        socketServer.enable( "browser client minification" )
        socketServer.enable( "browser client etag"         )
        socketServer.enable( "browser client gzip"         )

        # Activate the required middle ware
        #
        server.use( restify.acceptParser( server.acceptable ) )
        server.use( restify.CORS(
                origins:        [ "*" ]
                credentials:    true
                headers:        [ "Authorization" ]
            )
        )
        server.use( restify.fullResponse()  )
        server.use( restify.gzipResponse()  )
        server.use( restify.queryParser()   )
        server.use( restify.bodyParser()    )
        server.use( restify.throttle(
          burst:    100
          rate:     50
          ip:       true
          overrides:
            "localhost":
                rate:   0
                burst:  0
        ) )
        server.use( validation.validationPlugin(
            errorsAsArray: false
        ) )

        # Setup the swagger documentation
        #
        swagger.configure( server,
            info:
                contact:        "admin@localhost"
                description:    "The server API for the <%= _.slugify(packageName) %>"
                title:          "<%= _.slugify(packageName) %> API"
            apiDescriptions:
                get:            "GET Resources"
                post:           "POST Resources"
        )

        # The server handlers contains the actually call implementations so
        # they can be re-used by the socket implementations
        #
        implementations = {}

        # Register the server route(s) and handlers
        #
        require( "./server/static"          )( server, swagger, logger, implementations )
        require( "./server/version"         )( server, swagger, logger, implementations )
        require( "./server/datetime"        )( server, swagger, logger, implementations )

        # Setup socket.io listeners which mirror the REST calls and re-use their implementation(s)
        #
        socketServer.on( "connection", ( socket ) =>

            socket.on( "ping", ( data, callback ) =>
                callback( null, "pong" )
            )

            socket.on( "version", ( data, callback ) =>
                implementations.version( data )
                .then( ( data ) =>
                    callback( null, data )
                ,   ( error ) =>
                    callback( error )
                )
            )

            socket.on( "datetime", ( data, callback ) =>
                implementations.datetime( data )
                .then( ( data ) =>
                    callback( null, data )
                ,   ( error ) =>
                    callback( error )
                )
            )
        )

        # Add the restify routes to swagger
        #
        swagger.loadRestifyRoutes()

        # Start the API server
        #
        logger.info( "[API] I'm awake. Listening on #{@port}" )
        server.listen( @port )
