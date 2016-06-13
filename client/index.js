// External dependencies
var React = require( 'react' ),
    ReactDom = require( 'react-dom' );


// Dependencies
var environment = require( './lib/environment' ),
    Main = require( './components/main' );


/**
 * Initialise the app
 */
var init = function init( appEl ) {

  // Mount the app
  if ( appEl ) {
    ReactDom.render( <Main />, appEl );
  }

};


// Manually initialise during test environment
if ( environment.name != 'test' ) {
  init( document.getElementById( 'app' ) );
}


// Exports
module.exports = {
  init: init
};
