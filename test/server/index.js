// External dependencies
//


// Dependencies
var app = require( '../../server' );


/**
 * Start a new instance of the server
 */
before( function( done ) {
  app.init().then( done );
} );
