// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' ),
    topicActions = require( '../actions/topics' ),
    topicStore = require( '../stores/topics' );


/**
 * Word component
 */
var WordCloudWord = React.createClass( {

  /**
   * Setup state
   */
  getInitialState: function getInitialState() {
    var topicStoreState = topicStore.getState();

    return {
      isActive: topicStoreState.activeTopicId == this.props.id
    };
  },

  /**
   * Initialise handler
   */
  componentDidMount: function componentDidMount() {

    // Set events
    topicStore.listen( this.handleUpdatedTopicStore );

  },

  /**
   * Gracefully unmount the component
   */
  componentWillUnmount: function componentDidMount() {

    // Remove events
    topicStore.unlisten( this.handleUpdatedTopicStore );

  },

  /**
   * Handle an update from the Topic Store
   */
  handleUpdatedTopicStore: function handleUpdatedTopicStore( topicStore ) {

    this.setState( {
      isActive: this.props.id == topicStore.activeTopicId
    } );

  },

  /**
   * Handle a click event on the component
   */
  handleClick: function handleClick() {
    topicActions.updateActiveTopicId( this.props.id );
  },

  /**
   * Render!
   */
  render: function render() {
    var wordClasses = {
      'word': true,
      'word--positive': this.props.sentimentScore >= 60,
      'word--negative': this.props.sentimentScore < 40,
      'is-active': this.state.isActive
    };

    wordClasses[ 'word--' + this.props.weight ] = true;

    return (
      <span className={ utils.toClass( wordClasses ) } onClick={ this.handleClick }>{ this.props.label }</span>
    );
  }

} );


// Exports
module.exports = WordCloudWord;
