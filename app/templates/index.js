// Add coffee-script support
//
require( "coffee-script/register" );

// Include the required modules and configuration
//
var API = require( "./src/api/core" );

// Create the API instance
//
var api = new API();

// Start the API
//
api.start();