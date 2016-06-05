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

  this.bindListeners( {
    handleUpdateTopics: TopicActions.updateTopics
  } );

};


TopicStore.prototype = {

  /**
   * Handle update of the topics
   */
  handleUpdateTopics: function handleUpdateTopics( topics ) {
    this.topics = topics;
  }

};


// Exports
module.exports = dispatcher.createStore( TopicStore, 'TopicStore' );
