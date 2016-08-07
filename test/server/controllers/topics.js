// External dependencies
const request = require( 'request-promise' );
const _ = require( 'lodash' );


// Dependencies
const shared = require( '../lib/shared' );
const environment = require( '../../../server/lib/environment' );
const topics = require( '../../../data/topics' );


describe( 'Server: Topics API', function () {

  describe( 'Retrieve topic collection', function() {

    before( function( done ) {

      this.expectedStatusCode = 200;
      this.expectedContentType = 'json';

      request( {
        uri: environment.baseUrl + '/api/topics',
        method: 'get',
        json: true,
        resolveWithFullResponse: true
      } )
        .then( response => {
          this.response = response;
          done();
        } );

    } );

    shared.shouldRespondWithCorrectStatusCode();
    shared.shouldRespondWithCorrectContentType();

    it( 'should retrieve the collection of topics', function() {
      this.response.body.should.be.an.Array;
      this.response.body[ 0 ].should.have.properties( 'id' );
    } );

  } );

  describe( 'Retrieve topic', function() {

    before( function( done ) {

      this.expectedStatusCode = 200;
      this.expectedContentType = 'json';
      this.expectedTopic = _.first( topics.topics );

      request( {
        uri: environment.baseUrl + '/api/topics/' + this.expectedTopic.id,
        method: 'get',
        json: true,
        resolveWithFullResponse: true,
        simple: false
      } )
        .then( response => {
          this.response = response;
          done();
        } );

    } );

    shared.shouldRespondWithCorrectStatusCode();
    shared.shouldRespondWithCorrectContentType();

    it( 'should retrieve the correct topic', function() {
      this.response.body.id.should.eql( this.expectedTopic.id );
    } );

  } );

  describe( 'Retrieve invalid topic', function() {

    before( function( done ) {

      this.expectedStatusCode = 404;
      this.expectedContentType = 'json';

      request( {
        uri: environment.baseUrl + '/api/topics/invalid',
        method: 'get',
        json: true,
        resolveWithFullResponse: true,
        simple: false
      } )
        .then( response => {
          this.response = response;
          done();
        } );

    } );

    shared.shouldRespondWithCorrectStatusCode();
    shared.shouldRespondWithCorrectContentType();

  } );

} );
