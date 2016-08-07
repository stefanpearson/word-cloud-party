// External dependencies
//


// Dependencies
import dispatcher from '../lib/dispatcher';
import topicActions from '../actions/topics';


/**
 * Topic Store constructor
 */
class TopicStore {

  /**
   * Constructor
   */
  constructor() {

    this.topics = [];
    this.activeTopicId = null;

    this.bindListeners( {
      handleUpdateTopics: topicActions.updateTopics,
      handleUpdateActiveTopicId: topicActions.updateActiveTopicId
    } );

  }

  /**
   * Handle an update of the topics
   */
  handleUpdateTopics( topics ) {

    this.topics = topics;

    if ( this.activeTopicId === null && topics.length ) {
      this.handleUpdateActiveTopicId( topics[ 0 ].id );
    }

  }

  /**
   * Handle an updated active topic
   */
  handleUpdateActiveTopicId( topicId ) {
    this.activeTopicId = topicId;
  }

};


// Exports
export default dispatcher.createStore( TopicStore, 'topicStore' );
