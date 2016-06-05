// External dependencies
var React = require( 'react' );


// Dependencies
var Sentiment = require( './sentiment' );


/**
 * Main Detail component
 * TODO: pass sentiment values on to sentiment component
 */
var MainDetail = React.createClass( {
  render: function render() {
    return (
      <div className="main__side">
        <header className="section-header">
          <h1 className="section-header__label">{ this.props.heading || '…' }</h1>
          <div className="section-header__badge">
            <div className="sentiment-score">{ this.props.sentimentScore || 0 }</div>
          </div>
        </header>
        <section class="stat-list">
          <div class="stat-list__item">
            <Sentiment />
          </div>
          <div class="stat-list__item">
            <Sentiment />
          </div>
          <div class="stat-list__item">
            <Sentiment />
          </div>
        </section>
      </div>
    );
  }
} );


// Exports
module.exports = MainDetail;
