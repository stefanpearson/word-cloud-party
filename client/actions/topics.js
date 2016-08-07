// External dependencies
import _ from 'lodash';


// Dependencies
import dispatcher from '../lib/dispatcher';
import * as api from '../data/api';


class TopicActions {

  /**
   * Constructor
   */
  constructor() {

    // Create actions that pass parameters straight through to the dispatcher
    this.generateActions( 'updateTopics', 'updateActiveTopicId' );

  }

  /**
   * Fetch topics from the API and shuffle them
   */
  fetchTopics() {
    return dispatch => {

      dispatch();

      return api.getTopics()
        .then( _.shuffle )
        .then( this.updateTopics );
    };
  }

};


// Exports
export default dispatcher.createActions( TopicActions );
