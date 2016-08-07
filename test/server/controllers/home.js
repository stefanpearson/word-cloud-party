// External dependencies
const request = require( 'request-promise' );
const nock = require( 'nock' );


// Dependencies
const shared = require( '../lib/shared' );
const environment = require( '../../../server/lib/environment' );


describe( 'Server: Home', function () {

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
        .then( response => {
          this.response = response;
          done();
        } );

    } );

    shared.shouldRespondWithCorrectStatusCode();
    shared.shouldRespondWithCorrectContentType();

  } );

} );
