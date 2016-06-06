// External dependencies
var _ = require( 'lodash' );


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
  fetchTopics: function fetchTopics() {
    return topicData.get()
      .then( _.shuffle )
      .then( this.updateTopics );
  },

  /**
   * Update topics
   */
  updateTopics: function updateTopics( topics ) {
    return topics;
  },

  /**
   * Update active topic
   */
  updateActiveTopicId: function updateActiveTopicId( topicId ) {
    return topicId;
  }

};


// Exports
module.exports = dispatcher.createActions( TopicActions );
