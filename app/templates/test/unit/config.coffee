chai    = require "chai"
path    = require "path"
config  = require "../../lib/config"

describe( "config", () ->

    describe( "#get", () ->
        it( "Should retrieve string config value", () ->
            chai.expect( config.get( "api-host" ) ).to.eql( "localhost" )
        )

        it( "Should retrieve number config value", () ->
            chai.expect( config.get( "api-port" ) ).to.eql( 8080 )
        )
    )

    describe( "#set", () ->
        config.set( "test-string", "bar" )
        config.set( "test-number", 42    )

        it( "Should set string config value", () ->
            chai.expect( config.get( "test-string" ) ).to.eql( "bar" )
        )

        it( "Should set number config value", () ->
            chai.expect( config.get( "test-number" ) ).to.eql( 42 )
        )
    )
)