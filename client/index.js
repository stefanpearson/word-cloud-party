// External dependencies
import React from 'react';
import ReactDom from 'react-dom';


// Dependencies
import environment from './lib/environment';
import Main from './components/main';


/**
 * Application
 */
class App {

  /**
   * Constructor
   */
  constructor( appEl ) {

    // Mount the app
    if ( appEl ) {
      ReactDom.render( <Main />, appEl );
    }

  }

};


// Instantiate
new App( document.getElementById( 'app' ) );


// Exports
export default App;
