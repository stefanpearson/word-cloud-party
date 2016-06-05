// External dependencies
var os = require( 'os' ),
    dotenv = require( 'dotenv' );


// Dependencies
//


var environmentName = process.env.NODE_ENV || process.env.node_env || 'development';


// Load .env in development environment
if ( environmentName == 'development' ) {
  dotenv.load();
}


var environment = {
  project: 'Word Cloud Party',
  sys: {
    os: os.hostname(),
    pid: process.pid
  },
  name: environmentName,
  protocol: process.env.PROTOCOL,
  baseUrl: process.env.PROTOCOL + '://' + process.env.HOST,
  port: process.env.PORT || process.env.port,
  logLevel: process.env.LOG_LEVEL
};


// Exports
module.exports = environment;
