// External dependencies
import _ from 'lodash';
import moment from 'moment';


// Dependencies
//


/**
 * Output a list of class names based on truthy hash values
 */
const toClass = hash => {
  return _.reduce( hash, ( memo, value, key ) => {
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


/**
 * Format date
 */
const formatDate = dateStr => moment( dateStr ).format( 'D/M' );


// Exports
export { toClass, formatDate };
