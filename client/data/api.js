// External dependencies
import request from 'request-promise';


// Dependencies
import environment from '../lib/environment';


/**
 * Get topic collection
 */
const getTopics = () => {
  return request( {
    uri: environment.baseUrl + '/api/topics',
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  } )
    .then( response => {
      if ( response.statusCode == 200 ) {
        return response.body;
      } else {
        throw new Error( response.body.message );
      }
    } );
};


/**
 * Get topic
 */
const getTopicById = id => {
  return request( {
    uri: environment.baseUrl + '/api/topics/' + id,
    method: 'GET',
    json: true,
    resolveWithFullResponse: true
  } )
    .then( response => {
      if ( response.statusCode == 200 ) {
        return response.body;
      } else {
        throw new Error( response.body.message );
      }
    } );
};


// Exports
export { getTopics, getTopicById };
