// External dependencies
const Promise = require( 'bluebird' );
const _ = require( 'lodash' );


// Dependencies
const ResponseError = require( '../../lib/response-error' );
const wrapResponse = require( '../../lib/response-wrapper' );
const topicData = require( '../../../data/topics' );


const topicCollection = topicData.topics.map( topic => _.omit( topic, 'queries' ) );


/**
 * API topics controller
 */
class Topics {

  /**
   * Constructor
   */
  constructor( router ) {

    router.get( '/api/topics', wrapResponse( this.requestGetTopics ) );
    router.get( '/api/topics/:id', wrapResponse( this.requestGetTopic ) );

  }

  /**
   * Request GET /api/topics
   * Responds with the topic collection
   */
  requestGetTopics( request, response ) {
    return Promise.resolve()
      .then( () => {
        return response.status( 200 ).send( topicCollection );
      } );
  }

  /**
   * Request GET /api/topics/:id
   * Responds with a single topic
   */
  requestGetTopic( request, response ) {
    return Promise.resolve()
      .then( () => {

        const topic = _.find( topicCollection, { id: request.params.id } );

        if ( !topic ) {
          throw new ResponseError( 'notFound' );
        }

        return response.status( 200 ).send( topic );
      } );
  }

};


// Exports
module.exports = Topics;
