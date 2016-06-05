// External dependencies
var React = require( 'react' );


// Dependencies
var WordCloud = require( './word-cloud' );


/**
 * Main Body component
 */
var MainBody = React.createClass( {
  render: function render() {
    return (
      <div className="main__body">
        <header className="header">
          <h1>Topics</h1>
        </header>
        <WordCloud />
      </div>
    );
  }
} );


// Exports
module.exports = MainBody;
