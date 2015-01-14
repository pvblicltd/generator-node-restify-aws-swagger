// Add coffee-script support
//
require( "coffee-script/register" );

// Collect command-line options and arguments
//
var args     = process.argv.slice( 2 );

// Include the required modules and configuration
//
var Database = require( "./lib/database/core" );
var API      = require( "./lib/api/core"      );

// Create the database instance
//
var database = new Database();

// Create the API instance
//
var api = new API( database );

// Start the API
//
api.start( args );