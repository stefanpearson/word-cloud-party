// External dependencies
import sinon from 'sinon';
import Promise from 'bluebird';
import _ from 'lodash';


// Dependencies
import dispatcher from '../../../client/lib/dispatcher';
import topicData from '../../../data/topics';


// Test module
import topicActions from '../../../client/actions/topics';


// Mock modules
const apiMock = {
  getTopics: () => Promise.resolve( topicData.topics ),
  getTopicById: () => Promise.resolve( topicData.topics[ 0 ] )
};


describe( 'Client: topicActions', function() {

  before( () => {

    // Rewire dependencies to mocks
    topicActions.__Rewire__( 'api', apiMock );

  } );

  after( () => {

    // Reset dependencies
    topicActions.__ResetDependency__( 'api' );

  } );

  describe( 'Triggering fetchTopics', function() {

    beforeEach( done => {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );

      topicActions.fetchTopics()
        .then( () => done() );

    } );

    afterEach( () => {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the fetchTopics and updateTopics actions', () => {

      const dispatchFetchTopicsSpyCall = this.dispatcherSpy.getCall( 0 );
      const dispatchUpdateTopicsSpyCall = this.dispatcherSpy.getCall( 1 );

      this.dispatcherSpy.callCount.should.eql( 2 );
      dispatchFetchTopicsSpyCall.args[ 0 ].details.name.should.eql( 'fetchTopics' );
      dispatchUpdateTopicsSpyCall.args[ 0 ].details.name.should.eql( 'updateTopics' );
      dispatchUpdateTopicsSpyCall.args[ 0 ].data.length.should.eql( topicData.topics.length );

    } );

    it( 'should shuffle the topics', () => {

      const dispatchUpdateTopicsSpyCall = this.dispatcherSpy.getCall( 1 );
      const originalIds = topicData.topics.map( topic => topic.id );
      const retrievedIds = dispatchUpdateTopicsSpyCall.args[ 0 ].data.map( topic => topic.id );

      retrievedIds.length.should.eql( originalIds.length );
      retrievedIds.should.not.eql( originalIds );

    } );

  } );

  describe( 'Triggering updateTopics', function() {

    beforeEach( () => {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );

      topicActions.updateTopics( topicData.topics );

    } );

    afterEach( () => {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the updateTopics action with the given topics', () => {

      const dispatcherSpyCall = this.dispatcherSpy.getCall( 0 );

      this.dispatcherSpy.callCount.should.eql( 1 );
      dispatcherSpyCall.args[ 0 ].details.name.should.eql( 'updateTopics' );
      dispatcherSpyCall.args[ 0 ].data.length.should.eql( topicData.topics.length );

    } );

  } );

  describe( 'Triggering updateActiveTopic', function() {

    beforeEach( () => {

      this.dispatcherSpy = sinon.spy( dispatcher.dispatcher, 'dispatch' );
      this.activeTopicId = topicData.topics[ 0 ].id;

      topicActions.updateActiveTopicId( this.activeTopicId );

    } );

    afterEach( () => {
      dispatcher.dispatcher.dispatch.restore();
    } );

    it( 'should dispatch the updateActiveTopic action with the given active topic ID', () => {

      const dispatcherSpyCall = this.dispatcherSpy.getCall( 0 );

      this.dispatcherSpy.callCount.should.eql( 1 );
      dispatcherSpyCall.args[ 0 ].details.name.should.eql( 'updateActiveTopicId' );
      dispatcherSpyCall.args[ 0 ].data.should.eql( this.activeTopicId );

    } );

  } );

} );
