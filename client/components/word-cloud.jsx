// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var WordCloudWord = require( './word-cloud-word' ),
    topicStore = require( '../stores/topics' ),
    topicActions = require( '../actions/topics' );


/**
 * Word Cloud component
 */
var WordCloud = React.createClass( {

  /**
   * Setup state
   */
  getInitialState: function getInitialState() {
    var topicStoreState = topicStore.getState();

    return {
      topics: topicStoreState.topics
    };
  },

  /**
   * Initialise handler
   */
  componentDidMount: function componentDidMount() {

    // Set events
    topicStore.listen( this.handleUpdatedTopicStore );

    // Trigger an action to fetch the topics
    topicActions.fetchTopics();

  },

  /**
   * Gracefully unmount the component
   */
  componentWillUnmount: function componentDidMount() {

    // Remove events
    topicStore.unlisten( this.handleUpdatedTopicStore );

  },

  /**
   * Handle updated topics from the store
   */
  handleUpdatedTopicStore: function handleUpdatedTopicStore( state ) {

    this.setState( {
      topics: state.topics
    } );

  },

  /**
   * Render!
   */
  render: function render() {
    var sortedTopicIds = WordCloud.sortTopicsByVolume( this.state.topics );

    return (
      <div className="word-cloud">
        { _.map( this.state.topics, function( topic ) {
          var props = {
            id: topic.id,
            label: topic.label,
            sentimentScore: topic.sentimentScore,
            weight: WordCloud.getTopicWeight( topic, sortedTopicIds )
          };
          return <WordCloudWord key={ topic.id } {...props} />;
        }.bind( this ) ) }
      </div>
    );
  },

  /**
   * Static methods
   */
  statics: {

    /**
     * Utility to sort topic IDs (by volume)
     */
    sortTopicsByVolume: function cacheSortedTopicState( topics ) {
      return sortedIndexes = _.chain( topics )
        .sortBy( function( topic ) {
          return topic.volume;
        } )
        .map( function( topic ) {
          return topic.id;
        } )
        .reverse()
        .value();
    },

    /**
     * Utility to return the weight of a topic, relative to the collection
     */
    getTopicWeight: function getTopicWeight( topic, sortedTopicIds ) {
      var index = _.indexOf( sortedTopicIds, topic.id ),
          total = _.size( sortedTopicIds );

      return Math.ceil( ( index + 1 ) / ( total / 6 ) );
    }

  }

} );


// Exports
module.exports = WordCloud;
