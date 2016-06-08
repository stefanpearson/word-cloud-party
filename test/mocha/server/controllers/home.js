// External dependencies
var request = require( 'request-promise' );


// Dependencies
var shared = require( '../lib/shared' ),
    environment = require( '../../../../server/lib/environment' );


describe( 'Home', function () {

  describe( 'Retrieve home', function() {

    before( function( done ) {

      this.expectedStatusCode = 200;
      this.expectedContentType = 'html';

      request( {
        uri: environment.baseUrl,
        method: 'get',
        resolveWithFullResponse: true,
        simple: false
      } )
        .then( function( response ) {
          this.response = response;
          done();
        }.bind( this ) );

    } );

    shared.shouldRespondWithCorrectStatusCode();
    shared.shouldRespondWithCorrectContentType();

  } );

} );
