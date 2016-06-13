// // External dependencies
// var React = require( 'react' ),
//     enzyme = require( 'enzyme' ),
//     nock = require( 'nock' );


// // Dependencies
// var environment = require( '../../client/lib/environment' ),
//     Main = require( '../../client/components/main' ),
//     topics = require( '../../data/topics.json' ).topics;


// var jsdom = require('jsdom').jsdom;

// var exposedProperties = ['window', 'navigator', 'document'];

// global.document = jsdom('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });

// global.navigator = {
//   userAgent: 'node.js'
// };

// documentRef = document;


// /**
//  * Start a new instance of the client
//  */
// before( function() {

//   this.app = enzyme.mount( <Main /> );

// } );
