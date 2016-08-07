// External dependencies
import React from 'react';
import _ from 'lodash';


// Dependencies
import WordCloudWord from './word-cloud-word';
import topicStore from '../stores/topics';
import topicActions from '../actions/topics';


/**
 * Word Cloud component
 */
class WordCloud extends React.Component {

  /**
   * Constructor
   */
  constructor( props ) {

    const topicStoreState = topicStore.getState();

    // Call super's constructor first
    super( props );

    // Bind handlers once
    this.handleUpdatedTopicStore = this.handleUpdatedTopicStore.bind( this );

    // Set initial state
    this.state = {
      topics: topicStoreState.topics
    };

  }

  /**
   * Initialise handler
   */
  componentDidMount() {

    // Set events
    topicStore.listen( this.handleUpdatedTopicStore );

    // Trigger an action to fetch the topics
    topicActions.fetchTopics();

  }

  /**
   * Gracefully unmount the component
   */
  componentWillUnmount() {

    // Remove events
    topicStore.unlisten( this.handleUpdatedTopicStore );

  }

  /**
   * Handle updated topics from the store
   */
  handleUpdatedTopicStore( state ) {

    this.setState( {
      topics: state.topics
    } );

  }

  /**
   * Render!
   */
  render() {

    const sortedTopicIds = WordCloud.sortTopicsByVolume( this.state.topics );

    const wordCloudWords = this.state.topics.map( topic => {
      let props = {
        id: topic.id,
        label: topic.label,
        sentimentScore: topic.sentimentScore,
        weight: WordCloud.getTopicWeight( topic, sortedTopicIds )
      };
      return <WordCloudWord key={ topic.id } {...props} />;
    } );

    return (
      <div className="word-cloud">
        { wordCloudWords }
      </div>
    );
  }

  /**
   * Utility to sort topic IDs (by volume)
   */
  static sortTopicsByVolume( topics ) {
    return _.chain( topics )
      .sortBy( topic => topic.volume )
      .map( topic => topic.id )
      .reverse()
      .value();
  }

  /**
   * Utility to return the weight of a topic, relative to the collection
   */
  static getTopicWeight( topic, sortedTopicIds ) {

    const index = _.indexOf( sortedTopicIds, topic.id );
    const total = _.size( sortedTopicIds );

    return Math.ceil( ( index + 1 ) / ( total / 6 ) );
  }

};


// Exports
export default WordCloud;
