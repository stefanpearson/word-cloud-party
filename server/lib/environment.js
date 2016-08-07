// External dependencies
const os = require( 'os' );
const dotenv = require( 'dotenv' );


// Dependencies
//


const environmentName = process.env.NODE_ENV || process.env.node_env || 'development';


// Load .env in development environment
if ( environmentName == 'development' ) {
  dotenv.load();
}


const environment = {
  project: 'Word Cloud Party',
  sys: {
    os: os.hostname(),
    pid: process.pid
  },
  name: environmentName,
  protocol: process.env.PROTOCOL,
  host: process.env.HOST,
  port: process.env.PORT || process.env.port,
  baseUrl: process.env.PROTOCOL + '://' + process.env.HOST,
  logLevel: process.env.LOG_LEVEL
};


// Exports
module.exports = environment;
