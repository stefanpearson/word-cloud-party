// External dependencies
//


// Dependencies
var dispatcher = require( '../lib/dispatcher' ),
    topicData = require( '../data/topics' );


/**
 * Topic Action constructor
 */
var TopicActions = function() {};


TopicActions.prototype = {

  /**
   * Fetch topics from data provider
   */
  fetchTopics: function fetchTopics( dispatch ) {
    return function( dispatch ) {

      dispatch();

      return topicData.get()
        .then( this.updateTopics );
    }.bind( this );
  },

  /**
   * Update topics
   */
  updateTopics: function updateTopics( topics ) {
    return topics;
  }

};


// Exports
module.exports = dispatcher.createActions( TopicActions );
