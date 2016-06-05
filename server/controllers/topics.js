// External dependencies
var Promise = require( 'bluebird' ),
    _ = require( 'lodash' );


// Dependencies
var router = require( '../lib/router' ),
    ResponseError = require( '../lib/response-error' ),
    wrapResponse = require( '../lib/response-wrapper' ),
    topicData = require( '../../data/topics' );


var topicCollection = _.map( topicData.topics, function( topic ) {
  return _.omit( topic, 'queries' );
} );


/**
 * Initialise
 */
var init = function() {

  router.get( '/api/topics', wrapResponse( requestGetTopics ) );
  router.get( '/api/topics/:id', wrapResponse( requestGetTopic ) );

};


/**
 * Request GET /api/topics
 */
var requestGetTopics = function requestGetTopics( request, response ) {
  return Promise.resolve()
    .then( function() {
      return response.status( 200 ).send( topicCollection );
    } );
};


/**
 * Request GET /api/topics/:id
 */
var requestGetTopic = function requestGetTopic( request, response ) {
  return Promise.resolve()
    .then( function() {
      var topic = _.find( topicCollection, { id: request.params.id } );

      if ( !topic ) {
        throw new ResponseError( 'notFound' );
      }

      return response.status( 200 ).send( topic );
    } );
};


// Initialise
init();


// Exports
//
