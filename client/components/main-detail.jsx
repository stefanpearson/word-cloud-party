// External dependencies
import React from 'react';
import _ from 'lodash';


// Dependencies
import Sentiment from './sentiment';
import DayList from './day-list';
import topicStore from '../stores/topics';


/**
 * Main Detail component
 */
class MainDetail extends React.Component {

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
      topic: _.find( topicStoreState.topics, { id: topicStoreState.activeTopicId } ) || null
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

    const activeTopic = _.find( topicStore.topics, { id: topicStore.activeTopicId } );

    if ( activeTopic ) {
      this.setState( {
        topic: activeTopic
      } );
    }

  }

  /**
   * Render!
   */
  render() {

    if ( _.isEmpty( this.state.topic ) ) {
      return this.renderEmpty();
    } else {
      return this.renderDetail();
    }

  }

  /**
   * Render empty if there are no properties
   */
  renderEmpty() {
    return (
      <div className="main__side"></div>
    );
  }

  /**
   * Render the main detail view
   */
  renderDetail() {

    const sentiments = [
      {
        sentiment: 'positive',
        value: this.state.topic.sentiment.positive
      },
      {
        sentiment: 'neutral',
        value: this.state.topic.sentiment.neutral
      },
      {
        sentiment: 'negative',
        value: this.state.topic.sentiment.negative
      }
    ];

    const days = _.chain( this.state.topic.days )
      .sortBy( 'date' )
      .reverse()
      .value();

    const statListItems = sentiments.map( ( sentiment, index ) => {
      return (
        <div className="stat-list__item" key={ index }>
          <Sentiment { ...sentiment } />
        </div>
      );
    } );

    return (
      <div className="main__side">
        <header className="section-header">
          <h1 className="section-header__label">{ this.state.topic.label }</h1>
          <div className="section-header__badge">
            <div className="sentiment-score">{ this.state.topic.sentimentScore }</div>
          </div>
        </header>
        <section className="stat-list">
          { statListItems }
        </section>
        <DayList days={ days } />
      </div>
    );
  }

};


// Exports
//export default MainDetail;
module.exports = MainDetail;
