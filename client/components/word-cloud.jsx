// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var WordCloudWord = require( './word-cloud-word' ),
    TopicStore = require( '../stores/topics' ),
    TopicActions = require( '../actions/topics' );


/**
 * Word Cloud component
 * TODO: loop through words and pass properties through
 */
var WordCloud = React.createClass( {

  getInitialState: function getInitialState() {
    return TopicStore.getState();
  },

  componentDidMount: function componentDidMount() {
    TopicStore.listen( this.onChange );
    TopicActions.fetchTopics();
  },

  componentWillUnmount: function componentDidMount() {
    TopicStore.unlisten( this.onChange );
  },

  onChange: function onChange( state ) {
    var sortedIndexes = _.chain( state.topics )
      .sortBy( function( topic ) {
        return topic.volume;
      } )
      .map( function( topic ) {
        return topic.id;
      } )
      .reverse()
      .value();

    this.setState( {
      topics: _.shuffle( state.topics )
    } );

    this.setState( {
      sortedIndexes: sortedIndexes
    } );

  },

  getWordWeight: function getWordWeight( topic ) {
    var index = _.indexOf( this.state.sortedIndexes, topic.id ),
        total = _.size( this.state.sortedIndexes );

    return Math.ceil( index / ( total / 6 ) );
  },

  render: function render() {
    return (
      <div className="word-cloud">
        { this.state.topics.map( function( topic ) {
          var props = {
            label: topic.label,
            sentimentScore: topic.sentimentScore,
            weight: this.getWordWeight( topic )
          };
          return <WordCloudWord key={ topic.id } {...props} />;
        }.bind( this ) ) }
      </div>
    );
  }
} );


// Exports
module.exports = WordCloud;
