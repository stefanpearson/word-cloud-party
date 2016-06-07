// External dependencies
var http = require( 'http' ),
    express = require( 'express' ),
    serveStatic = require( 'serve-static' ),
    bodyParser = require( 'body-parser' ),
    cors = require( 'cors' ),
    compression = require( 'compression' ),
    Promise = require( 'bluebird' ),
    _ = require( 'lodash' );


// Dependencies
var middleware = require( './lib/middleware' ),
    router = require( './lib/router' ),
    environment = require( './lib/environment' ),
    logger = require( './lib/logger' ),
    nunjucks = require( './lib/nunjucks' );


/**
 * Initialise the server
 */
var init = function init() {
  return new Promise( function( resolve, reject ) {
    var app = express(),
        server = http.createServer( app );

    // Initialise controllers
    require( './controllers' );

    // Initialise template engine
    nunjucks.init( app );

    // Middleware
    app.use( middleware.removeTrailingSlash );
    app.use( cors() );
    app.use( bodyParser.json() );
    app.use( bodyParser.urlencoded( { extended: true } ) );
    app.use( compression() );
    app.use( router );
    app.use( serveStatic( './server/public' ) );
    app.use( middleware.notFound );

    // Start app
    server.listen( environment.port, function() {
      logger.info( environment.project + ' running at ' + environment.baseUrl );
      return resolve();
    } );

    // Log the environment
    logger.debug( JSON.stringify( environment ) );

  } );
};


// Manually initialise during test environment
if ( environment.name != 'test' ) {
  init();
}


// Exports
module.exports = {
  init: init
};
