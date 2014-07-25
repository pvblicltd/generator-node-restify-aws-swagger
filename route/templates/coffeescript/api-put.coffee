Q               = require "q"
modelValidator  = require "../../models/modelToValidation"
<%= routeName %>ResponseModel = require "../../models/<%= routeName %>Response"

module.exports = ( server, swagger, logger, implementations ) ->

    # Create the call implementation code
    #
    implementations.<%= routeName %> = () ->
        deferred = Q.defer()

        logger.info( "[API] Requested <%= routeName %>" )

        deferred.resolve(
            # ** Your response here **
        )

        return deferred.promise

    validation = modelValidator( <%= routeName %>ResponseModel )

    # Setup the server route
    #
    server.<%= routeMethod %>(
        url:                            "/<%= routeSection %>/<%= routeName %>"
        swagger:
            summary:                    "<%= routeDescription %>"
            notes:                      "<%= routeNotes %>"
            nickname:                   "server<%= routeName %>"
            consumes:                   [ "application/json" ]
            produces:                   [ "application/json" ]
            responseMessages: [
                code:                   200
                message:                "Success"
                responseModel:          "<%= routeName %>Response"
            ]

        validation:                     validation

        models:
            <%= routeName %>ResponseModel: <%= routeName %>ResponseModel
    ,
        ( request, response, next ) ->
            implementations.<%= routeName %>()
            .then( ( data ) ->
                response.send( 200, data )
            ,   ( error ) ->
                response.send( error.code or 500, error.message or error )
            )
    )