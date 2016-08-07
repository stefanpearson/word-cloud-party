// External dependencies
//


// Dependencies
const utils = require( '../lib/utils' );
const wrapResponse = require( '../lib/response-wrapper' );


/**
 * Home controller
 */
class Home {

  /**
   * Constructor
   */
  constructor( router ) {
    router.get( '/', wrapResponse( this.requestGetHome ) );
  }

  /**
   * Request GET /
   */
  requestGetHome( request, response ) {

    response = utils.promisify( response );

    return response.renderPromise( 'shell.html', {
      layout: 'layouts/topics.html',
      document: {
        title: 'Topics',
        description: '…'
      }
    } )
      .then( result => {
        return response.status( 200 ).send( result );
      } );
  }

};


// Exports
module.exports = Home;
