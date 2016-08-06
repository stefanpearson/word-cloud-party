// External dependencies
import proxyquire from 'proxyquire';


// Dependencies
import dispatcher from '../../../client/lib/dispatcher';
import topicData from '../../../data/topics';


// Test module
const topicStore = proxyquire( '../../../client/stores/topics', {} ).default;


describe( 'Client: topicStore', function() {

  it( 'should have the correct state properties', () => {
    topicStore.getState().should.have.properties( [ 'topics', 'activeTopicId' ] );
  } );

  it( 'should update the store when an updateTopics action is dispatched', () => {
    dispatcher.dispatcher.dispatch( 'TopicActions.updateTopics', topicData.topics );
    topicStore.getState().topics.should.have.length( topicData.topics.length );
  } );

  it( 'should update the store when an updateActiveTopicId action is dispatched', () => {
    dispatcher.dispatcher.dispatch( 'TopicActions.updateActiveTopicId', topicData.topics[ 0 ].id );
    topicStore.getState().activeTopicId.should.eql( topicData.topics[ 0 ].id );
  } );

} );
