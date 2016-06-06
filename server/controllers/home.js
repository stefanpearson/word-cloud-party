// External dependencies
//


// Dependencies
var router = require( '../lib/router' ),
    utils = require( '../lib/utils' ),
    wrapResponse = require( '../lib/response-wrapper' );


/**
 * Initialise
 */
var init = function() {

  router.get( '/', wrapResponse( requestGetHome ) );

};


/**
 * Request GET /
 */
var requestGetHome = function requestGetHome( request, response ) {

  response = utils.promisify( response );

  return response.renderPromise( 'shell.html', {
    layout: 'layouts/topics.html',
    document: {
      title: 'Topics',
      description: '…'
    }
  } )
    .then( function( result ) {
      return response.status( 200 ).send( result );
    } );
};


// Initialise
init();


// Exports
//
