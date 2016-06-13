// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var Sentiment = require( './sentiment' ),
    DayList = require( './day-list' ),
    topicStore = require( '../stores/topics' );


/**
 * Main Detail component
 */
var MainDetail = React.createClass( {

  /**
   * Setup state
   */
  getInitialState: function getInitialState() {
    var topicStoreState = topicStore.getState();

    return {
      topic: _.find( topicStoreState.topics, { id: topicStoreState.activeTopicId } ) || null
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
    var activeTopic = _.find( topicStore.topics, { id: topicStore.activeTopicId } );

    if ( activeTopic ) {
      this.setState( {
        topic: activeTopic
      } );
    }

  },

  /**
   * Render!
   */
  render: function render() {

    if ( _.isEmpty( this.state.topic ) ) {
      return this.renderEmpty();
    } else {
      return this.renderDetail();
    }
  },

  /**
   * Render empty if there are no properties
   */
  renderEmpty: function renderEmpty() {
    return (
      <div className="main__side"></div>
    );
  },

  /**
   * Render the main detail view
   */
  renderDetail: function renderDetail() {
    var sentiments,
        days;

    sentiments = [
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

    days = _.chain( this.state.topic.days )
      .sortBy( 'date' )
      .reverse()
      .value();

    return (
      <div className="main__side">
        <header className="section-header">
          <h1 className="section-header__label">{ this.state.topic.label }</h1>
          <div className="section-header__badge">
            <div className="sentiment-score">{ this.state.topic.sentimentScore }</div>
          </div>
        </header>
        <section className="stat-list">
          {
            _.map( sentiments, function( sentiment, index ) {
              return (
                <div className="stat-list__item" key={ index }>
                  <Sentiment { ...sentiment } />
                </div>
              );
            } )
          }
        </section>
        <DayList days={ days } />
      </div>
    );
  }

} );


// Exports
module.exports = MainDetail;
