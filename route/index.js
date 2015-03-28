"use strict";
var util   = require( "util"             );
var path   = require( "path"             );
var yeoman = require( "yeoman-generator" );
var yosay  = require( "yosay"            );
var chalk  = require( "chalk"            );

var MadlibRestifyApiRouteGenerator = yeoman.generators.Base.extend(
{
  askFor: function ()
  {
    var done = this.async();

    // Have Yeoman greet the user.
    //
    this.log( yosay( "Let's add a new route to the API" ) );

    // Ask the user for the webapp details
    //
    var prompts = [
        {
            name:       "routeName"
        ,   message:    "What is the name of the route?"
        }
    ,   {
            name:       "routeSection"
        ,   message:    "What is the section/folder for this route?"
        }
    ,   {
            name:       "routeMethod"
        ,   message:    "Which method does the route use?"
        ,   type:       "list"
        ,   choices:    [ "get", "post", "put", "del" ]
        }
    ,   {
            name:       "routeDescription"
        ,   message:    "Describe the purpose of this route"
        }
    ,   {
            name:       "routeNotes"
        ,   message:    "Any additional notes for the route documentation?"
        }
    ];

    this.prompt( prompts, function( props )
    {
        this.routeName          = props.routeName;
        this.routeSection       = props.routeSection;
        this.routeMethod        = props.routeMethod;
        this.routeDescription   = props.routeDescription;
        this.routeNotes         = props.routeNotes;

        done();
    }.bind( this ) );
  },

  route: function()
  {
    // Copy the model file
    //
    this.copy( "model.js", "lib/models/" + this.routeName + "Response.js" );

    // Copy the route implementation for the correct method
    //
    this.copy( "api-" + this.routeMethod + ".js", "lib/api/" + this.routeSection +  "/" + this.routeName + ".js" );
  }
} );

module.exports = MadlibRestifyApiRouteGenerator;
