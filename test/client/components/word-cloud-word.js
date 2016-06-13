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
  '../actions/topics': utils.mockTopicActions,
  '../stores/topics': utils.mockTopicStore
};


// Test module
var WordCloudWord = proxyquire( '../../../client/components/word-cloud-word.jsx', mockModules );


describe( 'WordCloudWord component', function() {

  describe( 'WordCloudWord lifecycle', function() {

    beforeEach( function() {
      var props = {
        id: topicData.topics[ 0 ].id
      };

      this.component = <WordCloudWord { ...props } />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it( 'should have an active state if it matches the active topic in the store when mounted', function() {
      this.enzyme.state( 'isActive' ).should.eql( true );
    } );

    it( 'should trigger the updateActiveTopicId action on click', function() {
      var updateActiveTopicIdActionSpy = sinon.spy( mockModules[ '../actions/topics' ], 'updateActiveTopicId' );

      this.enzyme.simulate( 'click' );

      updateActiveTopicIdActionSpy.callCount.should.eql( 1 );
      updateActiveTopicIdActionSpy.getCall( 0 ).args[ 0 ].should.eql( this.enzyme.props().id );

      mockModules[ '../actions/topics' ].updateActiveTopicId.restore();

    } );

    it.skip( 'should update the state to be active when it matches the updated active topic in the store', function() {
      // TODO: figure out how to mock a topicStore event and watch state
    } );

    it.skip( 'should update the state to be inactive when it doesn\'t match the updated active topic in the store', function() {
      // TODO: figure out how to mock a topicStore event and watch state
    } );

  } );

  describe( 'WordCloudWord rendering', function() {

    before( function() {

      this.component = <WordCloudWord />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it( 'should render as active when the state is active', function() {

      this.enzyme.setState( { isActive: true } );

      this.enzyme.hasClass( 'is-active' ).should.be.true;

    } );

    it( 'should render as inactive when the state is inactive', function() {

      this.enzyme.setState( { isActive: false } );

      this.enzyme.hasClass( 'is-active' ).should.be.false;

    } );

    it( 'should render as positive when the topic has a positive sentiment', function() {

      this.enzyme.setProps( { sentimentScore: 60 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.true;
      this.enzyme.hasClass( 'word--neutral' ).should.be.false;
      this.enzyme.hasClass( 'word--negative' ).should.be.false;

    } );

    it( 'should render as neutral when the topic has a neutral sentiment', function() {

      this.enzyme.setProps( { sentimentScore: 40 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.false;
      this.enzyme.hasClass( 'word--neutral' ).should.be.true;
      this.enzyme.hasClass( 'word--negative' ).should.be.false;

    } );

    it( 'should render as negative when the topic has a negative sentiment', function() {

      this.enzyme.setProps( { sentimentScore: 39 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.false;
      this.enzyme.hasClass( 'word--neutral' ).should.be.false;
      this.enzyme.hasClass( 'word--negative' ).should.be.true;

    } );

    it( 'should render the correct weight', function() {

      _.times( function( index ) {
        var weight = index + 1;

        this.enzyme.setProps( { weight: weight } );

        this.enzyme.hasClass( 'word--' + weight ).should.be.true;
        this.enzyme.hasClass( 'word--' + ( weight - 1 ) ).should.be.false;

      }.bind( this ), 6 );

    } );

  } );

} );
