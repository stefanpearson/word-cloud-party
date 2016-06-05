// External dependencies
//


// Dependencies
var topicProvider = require( './data/topics' );


topicProvider.get()
  .then( function( topics ) {
    console.log( 'Got the topics!', topics );
  } );
