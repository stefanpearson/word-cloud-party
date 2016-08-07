// External dependencies
const Promise = require( 'bluebird' );


// Dependencies
//


/**
 * Promisify all functions on an object, with a suffix of 'Promise'
 * e.g. someMethod => someMethodPromise
 */
const promisify = function( obj ) {
  return Promise.promisifyAll( obj, { suffix: 'Promise' } );
};


// Exports
module.exports = {
  promisify: promisify
};
