// External dependencies
//


// Dependencies
var app = require( '../../server' );


before( function( done ) {

  // Start a new instance of the server
  app.init().then( done );

} );
