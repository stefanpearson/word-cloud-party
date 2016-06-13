// External dependencies
var React = require( 'react' ),
    enzyme = require( 'enzyme' ),
    proxyquire = require( 'proxyquire' ),
    sinon = require( 'sinon' ),
    _ = require( 'lodash' );


// Dependencies
var topicData = require( '../../../data/topics' ),
    utils = require( '../lib/utils' );


var mockModules = {
  './sentiment': React.createClass( utils.mockComponent ),
  './day-list': React.createClass( utils.mockComponent ),
  '../stores/topics': utils.mockTopicStore
};


// Test module
var MainDetail = proxyquire( '../../../client/components/main-detail.jsx', mockModules );


describe( 'Client: MainDetail component', function() {

  describe( 'MainDetail lifecycle', function() {

    before( function() {

      this.component = <MainDetail />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it.skip( 'should update the state to be the updated active topic in the store', function() {
      // TODO: figure out how to mock a topicStore event and watch state
    } );

  } );

  describe( 'MainDetail rendering', function() {

    before( function() {

      this.component = <MainDetail />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it( 'should render the correct data', function() {
      var topic = topicData.topics[ 0 ];

      this.enzyme.setState( {
        topic: topic
      } );

      this.enzyme.find( '.section-header__label' ).text().should.eql( topic.label );
      this.enzyme.find( '.sentiment-score' ).text().should.eql( topic.sentimentScore.toString() );
      this.enzyme.find( mockModules[ './day-list' ] ).props().should.have.property( 'days' );
      this.enzyme.find( mockModules[ './sentiment' ] ).length.should.eql( 3 );
      this.enzyme.find( mockModules[ './sentiment' ] ).forEach( function( sentiment ) {
        sentiment.props().should.have.properties( [ 'sentiment', 'value' ] );
      } );

    } );

    it( 'should render empty if there is no topic', function() {

      this.enzyme.setState( {
        topic: null
      } );

      this.enzyme.children().should.have.length( 0 );

    } );

  } );

} );
