// External dependencies
var React = require( 'react' );


// Dependencies
var MainBody = require( './main-body' ),
    MainDetail = require( './main-detail' );


/**
 * Main component
 */
var Main = React.createClass( {
  render: function render() {
    return (
      <div className="wrapper">
        <main className="main">
          <MainBody />
          <MainDetail />
        </main>
      </div>
    );
  }
} );


// Exports
module.exports = Main;
