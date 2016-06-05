// External dependencies
var _ = require( 'lodash' );


// Dependencies
//


/**
 * Utility to output a list of class names
 */
var toClass = function toClass( hash ) {
  return _.reduce( hash, function( memo, value, key ) {
    if ( value ) {
      memo = memo + ' ' + key;
    }
    return memo;
  }, '' );
};


// Exports
module.exports = {
  toClass: toClass
};
