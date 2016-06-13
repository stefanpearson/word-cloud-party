// External dependencies
var sinon = require( 'sinon' ),
    proxyquire = require( 'proxyquire' ),
    Promise = require( 'bluebird' ),
    _ = require( 'lodash' );


// Dependencies
var dispatcher = require( '../../../client/lib/dispatcher' ),
    topicData = require( '../../../data/topics' );


// Test module
var topicActions = proxyquire( '../../../client/actions/topics', {

  '../data/api': {

    getTopics: function getTopics() {
      return Promise.resolve( topicData.topics );
    },

    getTopicById: function getTopicById() {
      return Promise.resolve( topicData.topics[ 0 ] );
    }

  }

} );


describe( 'topicActions', function() {

  describe( 'Triggering fetchTopics', function() {

    beforeEach( function( done ) {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );

      topicActions.fetchTopics()
        .then( function() {
          done()
        } );

    } );

    afterEach( function() {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the fetchTopics and updateTopics actions', function() {
      var dispatchFetchTopicsSpyCall = this.dispatcherSpy.getCall( 0 ),
          dispatchUpdateTopicsSpyCall = this.dispatcherSpy.getCall( 1 );

      this.dispatcherSpy.callCount.should.eql( 2 );
      dispatchFetchTopicsSpyCall.args[ 0 ].details.name.should.eql( 'fetchTopics' );
      dispatchUpdateTopicsSpyCall.args[ 0 ].details.name.should.eql( 'updateTopics' );
      dispatchUpdateTopicsSpyCall.args[ 0 ].data.length.should.eql( topicData.topics.length );

    } );

    it( 'should shuffle the topics', function() {
      var dispatchUpdateTopicsSpyCall = this.dispatcherSpy.getCall( 1 ),
          originalIds = _.map( topicData.topics, function( topic ) { return topic.id; } ),
          retrievedIds = _.map( dispatchUpdateTopicsSpyCall.args[ 0 ].data, function( topic ) { return topic.id; } );

      retrievedIds.length.should.eql( originalIds.length );
      retrievedIds.should.not.eql( originalIds );

    } );

  } );

  describe( 'Triggering updateTopics', function() {

    beforeEach( function() {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );

      topicActions.updateTopics( topicData.topics );

    } );

    afterEach( function() {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the updateTopics action with the given topics', function() {
      var dispatcherSpyCall = this.dispatcherSpy.getCall( 0 );

      this.dispatcherSpy.callCount.should.eql( 1 );
      dispatcherSpyCall.args[ 0 ].details.name.should.eql( 'updateTopics' );
      dispatcherSpyCall.args[ 0 ].data.length.should.eql( topicData.topics.length );

    } );

  } );

  describe( 'Triggering updateActiveTopic', function() {

    beforeEach( function() {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );
      this.activeTopicId = topicData.topics[ 0 ].id;

      topicActions.updateActiveTopicId( this.activeTopicId );

    } );

    afterEach( function() {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the updateActiveTopic action with the given active topic ID', function() {
      var dispatcherSpyCall = this.dispatcherSpy.getCall( 0 );

      this.dispatcherSpy.callCount.should.eql( 1 );
      dispatcherSpyCall.args[ 0 ].details.name.should.eql( 'updateActiveTopicId' );
      dispatcherSpyCall.args[ 0 ].data.should.eql( this.activeTopicId );

    } );

  } );

} );
