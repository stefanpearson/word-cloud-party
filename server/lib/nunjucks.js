// External dependencies
const nunjucks = require( 'nunjucks' );


// Dependencies
const environment = require( './environment' );


// Local variables
const nunjucksEnvironment = nunjucks.configure( './server/templates', {
  autoescape: true,
  watch: true
} );


/**
 * Initialise
 */
const init = app => {

  nunjucksEnvironment.express( app );
  nunjucksEnvironment.addGlobal( 'env', environment );

};

// Exports
module.exports = {
  init: init,
  env: nunjucksEnvironment
};
