// External dependencies
var proxyquire = require( 'proxyquire' );


// Dependencies
var dispatcher = require( '../../../client/lib/dispatcher' ),
    topicData = require( '../../../data/topics' );


// Test module
var topicStore = proxyquire( '../../../client/stores/topics', {} );


describe( 'topicStore', function() {

  it( 'should have the correct state properties', function() {
    topicStore.getState().should.have.properties( [ 'topics', 'activeTopicId' ] );
  } );

  it( 'should update the store when an updateTopics action is dispatched', function() {
    dispatcher.dispatcher.dispatch( 'TopicActions.updateTopics', topicData.topics );
    topicStore.getState().topics.should.have.length( topicData.topics.length );
  } );

  it( 'should update the store when an updateActiveTopicId action is dispatched', function() {
    dispatcher.dispatcher.dispatch( 'TopicActions.updateActiveTopicId', topicData.topics[ 0 ].id );
    topicStore.getState().activeTopicId.should.eql( topicData.topics[ 0 ].id );
  } );

} );
