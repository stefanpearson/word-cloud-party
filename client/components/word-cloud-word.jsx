// External dependencies
import React from 'react';


// Dependencies
import * as utils from '../lib/utils';
import topicActions from '../actions/topics';
import topicStore from '../stores/topics';


/**
 * Word component
 */
class WordCloudWord extends React.Component {

  /**
   * Constructor
   */
  constructor( props ) {

    const topicStoreState = topicStore.getState();

    // Call super's constructor first
    super( props );

    // Bind handlers once
    this.handleUpdatedTopicStore = this.handleUpdatedTopicStore.bind( this );
    this.handleClick = this.handleClick.bind( this );

    // Set initial state
    this.state = {
      isActive: this.props.id == topicStoreState.activeTopicId
    };

  }

  /**
   * Initialise handler
   */
  componentDidMount() {

    // Set events
    topicStore.listen( this.handleUpdatedTopicStore );

  }

  /**
   * Gracefully unmount the component
   */
  componentWillUnmount() {

    // Remove events
    topicStore.unlisten( this.handleUpdatedTopicStore );

  }

  /**
   * Handle an update from the Topic Store
   */
  handleUpdatedTopicStore( topicStore ) {

    this.setState( {
      isActive: this.props.id == topicStore.activeTopicId
    } );

  }

  /**
   * Handle a click event on the component
   */
  handleClick() {
    topicActions.updateActiveTopicId( this.props.id );
  }

  /**
   * Render!
   */
  render() {

    const wordClasses = {
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

};


// Exports
export default WordCloudWord;
