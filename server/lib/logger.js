// External dependencies
var winston = require( 'winston' );


// Dependencies
var environment = require( './environment' );


// Instantiate a Winston logger with transports
var logger = new winston.Logger( {
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
