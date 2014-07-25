"use strict";
var util   = require( "util"             );
var path   = require( "path"             );
var yeoman = require( "yeoman-generator" );
var yosay  = require( "yosay"            );
var chalk  = require( "chalk"            );

// Determine packageName based on current folder name
//
var fullPath    = process.cwd();
var packageName = fullPath.split( path.sep ).pop()

var MadlibRestifyApiGenerator = yeoman.generators.Base.extend(
{
  init: function ()
  {
    this.pkg         = require( "../package.json" );
    this.currentYear = new Date().getFullYear()

    this.on( "end", function () {
      if ( !this.options[ "skip-install" ] )
      {
        this.installDependencies();
      }
    } );
  },

  askFor: function ()
  {
    var done = this.async();

    // Have Yeoman greet the user.
    //
    this.log( yosay( "Welcome to the marvelous MadlibRestifyApi generator!" ) );

    // Ask the user for the webapp details
    //
    var prompts = [
        {
            name:       "packageName"
        ,   message:    "What is the name of this API?"
        ,   default:    packageName
        }
    ,   {
            name:       "packageDescription"
        ,   message:    "What is the purpose (description) of this API?"
        }
    ,   {
            name:       "authorName"
        ,   message:    "What is your name?"
        ,   default:    this.user.git.username
        }
    ,   {
            name:       "authorEmail"
        ,   message:    "What is your email?"
        ,   default:    this.user.git.email
        }
    ,   {
            name:       "coffee"
        ,   message:    "Would you like to use CoffeeScript?"
        ,   type:       "confirm"
        ,   default:    true
        }
    ];

    this.prompt( prompts, function( props )
    {
        this.packageName        = props.packageName;
        this.packageDescription = props.packageDescription;
        this.authorName         = props.authorName;
        this.authorEmail        = props.authorEmail;

        // Store the CoffeeScript preference for future sub-generator use
        //
        this.config.set( "coffee", props.coffee )

        done();
    }.bind( this ) );
  },

  app: function()
  {
    // Create base folder structure and copy the shared resources
    //
    this.directory( "shared/log",             "log"                     );
    this.directory( "shared/static_content",  "static_content"          );

    this.template( "shared/README.md",        "README.md"               );
    this.template( "shared/LICENSE",          "LICENSE"                 );

    if ( this.config.get( "coffee" ) === true )
    {
        this.directory( "coffeescript/lib",           "lib"             );
        this.template(  "coffeescript/_package.json", "package.json"    );
        this.copy(      "coffeescript/index.js",      "index.js"        );
    }
    else
    {
        this.directory( "javascript/lib",           "lib"               );
        this.template(  "javascript/_package.json", "package.json"      );
        this.copy(      "javascript/index.js",      "index.js"          );
    }
  },

  projectfiles: function ()
  {
      this.copy( "shared/editorconfig",         ".editorconfig"        );
      this.copy( "shared/jshintrc",             ".jshintrc"            );
      this.copy( "shared/gitignore",            ".gitignore"           );
      this.copy( "shared/updateXDMProvider.sh", "updateXDMProvider.sh" );
  }
} );

module.exports = MadlibRestifyApiGenerator;