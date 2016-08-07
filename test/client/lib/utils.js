// External dependencies
import React from 'react';
import _ from 'lodash';


// Dependencies
import topicData from '../../../data/topics';


/**
 * Create mock React component stateless function
 */
const createMockComponent = () => {
  return props => {
    return ( <div /> );
  };
};


/**
 * Mock topic actions
 */
const mockTopicActions = {
  fetchTopics: _.noop,
  updateTopics: _.noop,
  updateActiveTopicId: _.noop
};


/**
 * Mock topic store
 */
const mockTopicStore = {
  getState: () => {
    return {
      activeTopicId: topicData.topics[ 0 ].id,
      topics: topicData.topics
    };
  },
  listen: _.noop,
  unlisten: _.noop
};


// Exports
export { createMockComponent, mockTopicActions, mockTopicStore };
