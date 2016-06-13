// External dependencies
var jsdom = require( 'jsdom' );


var exposedProperties = [ 'window', 'navigator', 'document' ];

global.document = jsdom.jsdom( '' );
global.window = document.defaultView;
global.navigator = {
  userAgent: 'node.js'
};

Object.keys( document.defaultView ).forEach( function( property ) {
  if ( typeof global[ property ] === 'undefined' ) {
    exposedProperties.push( property );
    global[ property ] = document.defaultView[ property ];
  }
} );

documentRef = document;
