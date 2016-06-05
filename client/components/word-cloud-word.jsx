// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' );


/**
 * Word component
 */
var WordCloudWord = React.createClass( {

  handleClick: function handleClick() {
    // dispatch something?
    console.log( this.props );
  },

  render: function render() {
    var wordClasses = {
      'word': true,
      'word--positive': this.props.sentimentScore >= 60,
      'word--negative': this.props.sentimentScore < 40,
      'is-active': this.props.isActive
    };

    wordClasses[ 'word--' + this.props.weight ] = true;

    return (
      <span className={ utils.toClass( wordClasses ) } onClick={ this.handleClick }>{ this.props.label }</span>
    );
  }

} );


// Exports
module.exports = WordCloudWord;
