// External dependencies
var nunjucks = require( 'nunjucks' );


// Dependencies
var environment = require( './environment' );


// Local variables
var nunjucksEnvironment = nunjucks.configure( './server/public/templates', {
  autoescape: true,
  watch: true
} );


/**
 * Initialise
 */
var init = function init( app ) {

  nunjucksEnvironment.express( app );
  nunjucksEnvironment.addGlobal( 'env', environment );

};

// Exports
module.exports = {
  init: init,
  env: nunjucksEnvironment
};
