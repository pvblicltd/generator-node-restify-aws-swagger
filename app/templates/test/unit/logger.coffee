chai = require "chai"

describe( "logger", () ->
    # Init the logger instance
    #
    logger = require "../../lib/logger"

    describe( "#log-level", () ->
        it( "Default log level is INFO(30)", () ->
            chai.expect( logger.level() ).to.eql( 30 )
        )

        it( "Set log level to DEBUG(20)", () ->
            logger.level( "debug" )
            chai.expect( logger.level() ).to.eql( 20 )
        )

        it( "Set log level back to INFO(30)", () ->
            logger.level( "info" )
            chai.expect( logger.level() ).to.eql( 30 )
        )
    )
)