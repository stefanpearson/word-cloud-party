// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var topicData = require( '../../../data/topics' );


/**
 * Mock React component object
 */
var mockComponent = {
  render: function render() {
    return ( <div></div> );
  }
};


/**
 * Mock topic actions
 */
var mockTopicActions = {
  fetchTopics: _.noop,
  updateTopics: _.noop,
  updateActiveTopicId: _.noop
};


/**
 * Mock topic store
 */
var mockTopicStore = {
  getState: function getState() {
    return {
      activeTopicId: topicData.topics[ 0 ].id,
      topics: topicData.topics
    };
  },
  listen: _.noop,
  unlisten: _.noop
};


// Exports
module.exports = {
  mockComponent: mockComponent,
  mockTopicActions: mockTopicActions,
  mockTopicStore: mockTopicStore
};
