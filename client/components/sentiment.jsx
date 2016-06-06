// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' );


/**
 * Sentiment component
 */
var Sentiment = React.createClass( {

  /**
   * Declare default properties
   */
  getDefaultProps: function getDefaultProps() {
    return {
      value: 0
    };
  },

  /**
   * Render!
   */
  render: function render() {
    var sentimentClasses = {
      'sentiment': true
    };

    sentimentClasses[ 'sentiment--' + this.props.sentiment ] = true;

    return (
      <div className={ utils.toClass( sentimentClasses ) }>
        <span className="sentiment__icon"></span>
        <span className="sentiment__value">{ this.props.value }</span>
      </div>
    );
  }

} );


// Exports
module.exports = Sentiment;
