// External dependencies
const Promise = require( 'bluebird' );


// Dependencies
const logger = require( './logger' );
const ResponseError = require( './response-error' );


/**
 * Respond when recovering from an error
 */
const respondWithError = ( response, responseError ) => {
  if ( !response.headersSent ) {
    return response.status( responseError.statusCode ).send( responseError );
  } else {
    logger.warn( 'Tried to respond twice when error thrown' );
  }
};


/**
 * Attach default catches for a promise within a response handler
 */
const wrapResponse = function( promise ) {
  return function( request, response, next ) {
    return promise.apply( null, arguments )
      .catch( { name: 'ResponseError' }, function( responseError ) {
        return respondWithError( response, responseError );
      } )
      .catch( error => {
        const responseError = new ResponseError( 'unknown' );
        logger.error( 'Unhandled request error', error.stack );
        return respondWithError( response, responseError );
      } );
  }
};


// Exports
module.exports = wrapResponse;
