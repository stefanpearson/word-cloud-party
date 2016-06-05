// External dependencies
var _ = require( 'lodash' );


// Dependencies
//


var errors = {
  'notFound': {
    message: 'Unknown resource. Please double check the request URL!',
    statusCode: 404
  },
  'invalidData': {
    message: 'Invalid request data!',
    statusCode: 400
  },
  'unknown': {
    message: 'Oh dear.',
    statusCode: 500
  }
};


/**
 * Response error constructor
 * If code is provided, do error lookup by code
 */
var ResponseError = function ResponseError( code, options ) {
  var baseError = {};

  options = options || {};

  baseError = Object.create( errors[ ( errors.hasOwnProperty( code ) ? code : 'unknown' ) ] );

  this.code = options.code || code;
  this.message = options.message || baseError.message;
  this.statusCode = options.statusCode || baseError.statusCode;
  this.errors = options.errors || [];

  return this;
};

ResponseError.prototype = Object.create( Error.prototype );


// Exports
module.exports = ResponseError;
