// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var Sentiment = require( './sentiment' ),
    DayList = require( './day-list' ),
    TopicStore = require( '../stores/topics' );


/**
 * Main Detail component
 */
var MainDetail = React.createClass( {

  /**
   * Setup state
   */
  getInitialState: function getInitialState() {
    var topicStore = TopicStore.getState();
    return _.find( topicStore.topics, { id: topicStore.activeTopicId } ) || null;
  },

  /**
   * Initialise handler
   */
  componentDidMount: function componentDidMount() {

    // Set events
    TopicStore.listen( this.handleUpdatedTopicStore );

  },

  /**
   * Gracefully unmount the component
   */
  componentWillUnmount: function componentDidMount() {

    // Remove events
    TopicStore.unlisten( this.onChange );

  },

  /**
   * Handle an update from the Topic Store
   */
  handleUpdatedTopicStore: function handleUpdatedTopicStore( topicStore ) {
    var activeTopic = _.find( topicStore.topics, { id: topicStore.activeTopicId } );

    if ( activeTopic ) {
      this.setState( activeTopic );
    }

  },

  /**
   * Render!
   */
  render: function render() {

    if ( _.isEmpty( this.state ) ) {
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
      <div className="main__side is-hidden"></div>
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
        value: this.state.sentiment.positive
      },
      {
        sentiment: 'neutral',
        value: this.state.sentiment.neutral
      },
      {
        sentiment: 'negative',
        value: this.state.sentiment.negative
      }
    ];

    days = _.chain( this.state.days )
      .sortBy( 'date' )
      .reverse()
      .value();

    return (
      <div className="main__side">
        <header className="section-header">
          <h1 className="section-header__label">{ this.state.label }</h1>
          <div className="section-header__badge">
            <div className="sentiment-score">{ this.state.sentimentScore }</div>
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
