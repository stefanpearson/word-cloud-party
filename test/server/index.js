// External dependencies
//


// Dependencies
var App = require( '../../server' );


before( function( done ) {

  // Start a new instance of the server
  new App();

  process.nextTick( () => done() );

} );
