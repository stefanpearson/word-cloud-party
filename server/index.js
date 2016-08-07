// External dependencies
const http = require( 'http' );
const express = require( 'express' );
const serveStatic = require( 'serve-static' );
const bodyParser = require( 'body-parser' );
const cors = require( 'cors' );
const compression = require( 'compression' );
const Promise = require( 'bluebird' );
const _ = require( 'lodash' );


// Dependencies
const middleware = require( './lib/middleware' );
const router = require( './lib/router' );
const environment = require( './lib/environment' );
const logger = require( './lib/logger' );
const nunjucks = require( './lib/nunjucks' );
const controllers = require( './controllers' );


/**
 * Server app
 */
class App {

    /**
     * Constructor
     */
    constructor() {

      this.express = express();
      this.server = http.createServer( this.express );

      // Initialise template engine
      nunjucks.init( this.express );

      // Instantiate controllers
      this.controllers = controllers.map( Controller => new Controller( router ) );

      // Middleware
      this.express.use( middleware.removeTrailingSlash );
      this.express.use( cors() );
      this.express.use( bodyParser.json() );
      this.express.use( bodyParser.urlencoded( { extended: true } ) );
      this.express.use( compression() );
      this.express.use( router );
      this.express.use( serveStatic( './server/public' ) );
      this.express.use( middleware.notFound );

      // Start server
      this.server.listen( environment.port, function() {
        logger.info( environment.project + ' running at ' + environment.baseUrl );
        // TODO: emit event
      } );

      // Log the environment
      logger.debug( JSON.stringify( environment ) );

    }

};


// Manually initialise during test environment
if ( environment.name != 'test' ) {
  new App();
}


// Exports
module.exports = App;
