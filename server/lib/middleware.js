// External dependencies
const Promise = require( 'bluebird' );


// Dependencies
const environment = require( './environment' );
const ResponseError = require( './response-error' );
const wrapResponse = require( './response-wrapper' );


/**
 * Redirect URLs with trailing slash
 * eg. /resource/ to /resource
 */
const removeTrailingSlash = ( request, response, next ) => {

  if ( request.url.substr( -1 ) == '/' && request.url.length > 1 ) {
    response.redirect( 301, request.url.slice( 0, -1 ) );
  } else {
    next();
  }

};


/**
 * Not found handler
 */
const notFound = ( request, response, next ) => {
  return Promise.reject( new ResponseError( 'notFound' ) );
};


// Exports
module.exports = {
  removeTrailingSlash: removeTrailingSlash,
  notFound: wrapResponse( notFound )
};
