// External dependencies
var _ = require( 'lodash' );


// Dependencies
var dispatcher = require( '../lib/dispatcher' ),
    api = require( '../data/api' );


/**
 * Topic Action constructor
 */
var TopicActions = function() {

  // Create actions that pass parameters straight through to the dispatcher
  this.generateActions( 'updateTopics', 'updateActiveTopicId' );

};


TopicActions.prototype = {

  /**
   * Fetch topics from data provider
   */
  fetchTopics: function fetchTopics() {
    return function( dispatch ) {

      dispatch();

      return api.getTopics()
        .then( _.shuffle )
        .then( this.updateTopics );
    }.bind( this );
  }

};


// Exports
module.exports = dispatcher.createActions( TopicActions );
