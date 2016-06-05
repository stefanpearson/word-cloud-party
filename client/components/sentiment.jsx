// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' );


/**
 * Sentiment component
 * TODO: add modifier classes
 */
var Sentiment = React.createClass( {
  render: function render() {
    var sentimentClasses = {
      'sentiment': true,
      'sentiment--positive': true,
      'sentiment--negative': false,
      'sentiment--neutral': false
    };

    return (
      <div className={ utils.toClass( sentimentClasses ) }>
        <span class="sentiment__icon"></span>
        <span class="sentiment__value">{ this.props.value }</span>
      </div>
    );
  }
} );


// Exports
module.exports = Sentiment;
