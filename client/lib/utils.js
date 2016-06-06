// External dependencies
var _ = require( 'lodash' );


// Dependencies
//


/**
 * Output a list of class names based on truthy hash values
 */
var toClass = function toClass( hash ) {
  return _.reduce( hash, function( memo, value, key ) {
    if ( value ) {
      if ( memo.length ) {
        memo = memo + ' ' + key;
      } else {
        memo = key;
      }
    }
    return memo;
  }, '' );
};


// Exports
module.exports = {
  toClass: toClass
};
