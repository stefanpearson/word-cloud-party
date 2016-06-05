// External dependencies
var request = require( 'request-promise' );


// Dependencies
var environment = require( '../lib/environment' );


/**
 * Get topic collection
 */
var get = function get() {
  return request( {
    uri: environment.baseUrl + '/api/topics',
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  } )
    .then( function( response ) {
      if ( response.statusCode == 200 ) {
        return response.body;
      } else {
        throw new Error( response.body.message );
      }
    } )
};


/**
 * Get topic
 */
var getById = function getById( id ) {
  return request( {
    uri: environment.baseUrl + '/api/topics/' + id,
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  } )
    .then( function( response ) {
      if ( response.statusCode == 200 ) {
        return response.body;
      } else {
        throw new Error( response.body.message );
      }
    } )
};


// Exports
module.exports = {
  get: get,
  getById: getById
};
