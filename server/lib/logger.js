// External dependencies
const winston = require( 'winston' );


// Dependencies
const environment = require( './environment' );


// Instantiate a Winston logger with transports
const logger = new winston.Logger( {
  transports: [
    new winston.transports.Console( {
      colorize: true,
      level: environment.logLevel
    } )
  ],
  exitOnError: false
} );


// Exports
module.exports = logger;
