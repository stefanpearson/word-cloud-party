// External dependencies
import jsdom from 'jsdom';


const exposedProperties = [ 'window', 'navigator', 'document' ];

global.document = jsdom.jsdom( '' );
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys( document.defaultView ).forEach( property => {
  if ( typeof global[ property ] === 'undefined' ) {
    exposedProperties.push( property );
    global[ property ] = document.defaultView[ property ];
  }
} );

documentRef = document;
