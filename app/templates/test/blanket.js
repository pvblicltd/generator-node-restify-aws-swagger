var path   = require( "path" );
var srcDir = path.join( __dirname, "..", "lib" );

require( "blanket" )(
{
  // Only files that match the pattern will be instrumented
  //
  pattern: srcDir
} );

// This is a way to include all source files for the coverage report
// Normally only files covered in your tests will show up
// I consider this to be a bit of a hack and have disabled it by default
//
// require( "require-dir" )( __dirname + "/../lib", { recurse: true, duplicates: true } );