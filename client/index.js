// External dependencies
var React = require( 'react' ),
    ReactDom = require( 'react-dom' );


// Dependencies
var topicProvider = require( './data/topics' ),
    Main = require( './components/main' );


/**
 * Initialise the app
 */
var init = function init() {
  var appEl = document.getElementById( 'app' );

  // Mount the app
  if ( appEl ) {
    ReactDom.render( <Main />, document.getElementById( 'app' ) );
  }

};


// Initialise
init();
