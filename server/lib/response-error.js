// External dependencies
const _ = require( 'lodash' );


// Dependencies
//


const errors = {
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
 * Response error
 */
class ResponseError extends Error {

  /**
   * Constructor
   * If code is provided, do error lookup by code
   */
  constructor( code, options = {} ) {

    const baseError = Object.create( errors[ ( errors.hasOwnProperty( code ) ? code : 'unknown' ) ] );

    super( options.code || code );

    this.name = 'ResponseError';

    this.code = options.code || code;
    this.message = options.message || baseError.message;
    this.statusCode = options.statusCode || baseError.statusCode;
    this.errors = options.errors || [];

  }

};


// Exports
module.exports = ResponseError;
