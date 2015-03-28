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

var nodeRestifyAwsSwagger = yeoman.generators.Base.extend(
{
    init: function ()
    {
        this.pkg         = require( "../package.json" );
        this.currentYear = new Date().getFullYear()

        this.on( "end", function ()
        {
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
        this.log( yosay( "Welcome to the Pvblic Ltd Restify, AWS & Swagger API generator!" ) );

        // Ask the user for the webapp details
        //
        var prompts = [
        {
            name:           "packageName"
            ,   message:    "What is the name of this API?"
            ,   default:    packageName
        }
        ,   {
            name:           "packageDescription"
            ,   message:    "What is the purpose (description) of this API?"
        }
        ,   {
            name:           "authorName"
            ,   message:    "What is your name?"
            ,   default:    this.user.git.username
        }
        ,   {
            name:           "authorEmail"
            ,   message:    "What is your email?"
            ,   default:    this.user.git.email
        }
        ];

        this.prompt( prompts, function( props )
        {
            this.packageName        = props.packageName;
            this.packageDescription = props.packageDescription;
            this.authorName         = props.authorName;
            this.authorEmail        = props.authorEmail;

            done();
        }.bind( this ) );
    },

    app: function()
    {
        // Create base folder structure and copy the shared resources
        //
        this.directory( "log",             "log"                    );
        this.directory( "static_content",  "static_content"         );
        this.directory( "test",            "test"                   );

        this.template( "README.md",        "README.md"              );
        this.template( "LICENSE",          "LICENSE"                );

        this.directory( "lib",              "lib"                   );
        this.template(  "_package.json",    "package.json"          );
        this.copy(      "index.js",         "index.js"              );
        this.copy(      "GruntFile.js", "GruntFile.js"      );
    },

    projectfiles: function ()
    {
        this.copy( "editorconfig",         ".editorconfig"          );
        this.copy( "jshintrc",             ".jshintrc"              );
        this.copy( "gitignore",            ".gitignore"             );
        this.copy( "updateXDMProvider.sh", "updateXDMProvider.sh"   );
        this.copy( "updateXDMProvider.sh", "updateXDMProvider.sh"   );
    }
} );

module.exports = nodeRestifyAwsSwagger;
