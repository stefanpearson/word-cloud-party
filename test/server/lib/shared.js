// External dependencies
//


// Dependencies
//


/**
 * Checks if the status code is the one that was expected
 */
const shouldRespondWithCorrectStatusCode = () => {
  it( 'should return the correct status code', function() {
    this.response.statusCode.should.eql( this.expectedStatusCode );
  } );
};


const shouldRespondWithCorrectContentType = () => {
  it( 'should return the correct content type', function() {
    this.response.headers[ 'content-type' ].should.containEql( this.expectedContentType );
  } );
};


// Export
module.exports = {
  shouldRespondWithCorrectStatusCode: shouldRespondWithCorrectStatusCode,
  shouldRespondWithCorrectContentType: shouldRespondWithCorrectContentType
};
