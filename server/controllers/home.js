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
  router.get( '/static', wrapResponse( requestGetStaticHome ) );

};


/**
 * Request GET /
 */
var requestGetHome = function requestGetHome( request, response ) {

  response = utils.promisify( response );

  return response.renderPromise( 'shell.html', {
    layout: 'layouts/cloud.html',
    document: {
      title: 'Word Cloud Party',
      description: '…'
    }
  } )
    .then( function( result ) {
      return response.status( 200 ).send( result );
    } );
};


/**
 * Request GET /static
 */
var requestGetStaticHome = function requestGetStaticHome( request, response ) {

  response = utils.promisify( response );

  return response.renderPromise( 'shell.html', {
    layout: 'layouts/cloud-static.html',
    document: {
      title: 'Word Cloud Party',
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
