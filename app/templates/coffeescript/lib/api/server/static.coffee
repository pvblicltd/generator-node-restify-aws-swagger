restify = require "restify"

module.exports = ( server, swagger, logger ) ->

    # Beware of how the directory path works:
    # http://stackoverflow.com/questions/15463841/serving-static-files-with-restify-node-js/15464132#15464132
    #
    # Setup static file hosting for XDM provider
    #
    server.get( /\/xdm\/?.*/, restify.serveStatic(
        directory:  "./static_content",
        default:    "index.html"
    ) )

    # Setup static file hosting for swagger-ui
    #
    server.get( /\/docs\/?.*/, restify.serveStatic(
        directory:  "./static_content",
        default:    "index.html"
    ) )