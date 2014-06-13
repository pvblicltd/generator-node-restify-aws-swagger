Q = require "q"

module.exports = ( server, swagger, logger, implementations ) ->

    # Create the call implementation code
    #
    implementations.version = () ->
        deferred = Q.defer()

        logger.info( "[API] Requested server info" )
        pkg = require( "../../../package.json" )

        deferred.resolve(
            name:           pkg.name
            version:        pkg.version
            description:    pkg.description
        )

        return deferred.promise

    # Setup the server route
    #
    server.get(
        url:                            "/version"
        swagger:
            summary:                    "Retrieves the server software version"
            notes:                      "The information is derived from the package.json file"
            nickname:                   "serverVersion"
            consumes:                   [ "application/json" ]
            produces:                   [ "application/json" ]
            responseMessages: [
                code:                   200
                message:                "Success"
                responseModel:          "versionResponse"
            ]

        validation:     {}
        models:
            versionResponse:
                id: "versionResponse"
                properties:
                    name:
                        type:           "string"
                        description:    "The server software package name"
                        required:       true
                    version:
                        type:           "string"
                        description:    "The server software version"
                        required:       true
                    description:
                        type:           "string"
                        description:    "The server software description"
                        required:       true
    ,
        ( request, response, next ) ->
            implementations.version()
            .then( ( data ) ->
                response.send( 200, data )
            ,   ( error ) ->
                response.send( error.code or 500, error.message or error )
            )
    )