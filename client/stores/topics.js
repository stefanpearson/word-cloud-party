// External dependencies
//


// Dependencies
var dispatcher = require( '../lib/dispatcher' ),
    TopicActions = require( '../actions/topics' );


/**
 * Topic Store constructor
 */
var TopicStore = function() {

  this.topics = [];
  this.activeTopicId = null;

  this.bindListeners( {
    handleUpdateTopics: TopicActions.updateTopics,
    handleUpdateActiveTopicId: TopicActions.updateActiveTopicId
  } );

};


TopicStore.prototype = {

  /**
   * Handle update of the topics
   */
  handleUpdateTopics: function handleUpdateTopics( topics ) {
    this.topics = topics;
  },

  /**
   * Handle an updated active topic
   */
  handleUpdateActiveTopicId: function handleUpdateActiveTopicId( topicId ) {
    this.activeTopicId = topicId;
  }

};


// Exports
module.exports = dispatcher.createStore( TopicStore, 'TopicStore' );
