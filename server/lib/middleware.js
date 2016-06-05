// External dependencies
var Promise = require( 'bluebird' );


// Dependencies
var environment = require( './environment' ),
    ResponseError = require( './response-error' ),
    wrapResponse = require( './response-wrapper' );


/**
 * Redirect URLs with trailing slash
 * eg. /resource/ to /resource
 */
var removeTrailingSlash = function removeTrailingSlash( request, response, next ) {

  if ( request.url.substr( -1 ) == '/' && request.url.length > 1 ) {
    response.redirect( 301, request.url.slice( 0, -1 ) );
  } else {
    next();
  }

};


/**
 * Not found handler
 */
var notFound = function notFound( request, response, next ) {
  return Promise.reject( new ResponseError( 'notFound' ) );
};


// Exports
module.exports = {
  removeTrailingSlash: removeTrailingSlash,
  notFound: wrapResponse( notFound )
};
