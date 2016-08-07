// External dependencies
import React from 'react';
import * as enzyme from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';


// Dependencies
import topicData from '../../../data/topics';
import * as utils from '../lib/utils';


// Test module
import MainDetail from '../../../client/components/main-detail';


// Mock modules
const SentimentMock = utils.createMockComponent();
const DayListMock = utils.createMockComponent();


describe( 'Client: MainDetail component', function() {

  before( () => {

    // Rewire dependencies to mocks
    MainDetail.__Rewire__( 'Sentiment', SentimentMock );
    MainDetail.__Rewire__( 'DayList', DayListMock );
    MainDetail.__Rewire__( 'topicStore', utils.mockTopicStore );

  } );

  after( () => {

    // Reset dependencies
    MainDetail.__ResetDependency__( 'Sentiment' );
    MainDetail.__ResetDependency__( 'DayList' );
    MainDetail.__ResetDependency__( 'topicStore' );

  } );

  describe( 'MainDetail lifecycle', function() {

    beforeEach( () => {

      this.topicStoreListenerSpy = sinon.spy( utils.mockTopicStore, 'listen' );
      this.component = <MainDetail />;
      this.enzyme = enzyme.mount( this.component );

    } );

    afterEach( () => {
      utils.mockTopicStore.listen.restore();
    } );

    it( 'should listen to the topic store', () => {

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ].should.be.a.Function;

    } );

    it( 'should update the state to be the updated active topic in the store', () => {

      const expectedTopic = _.sample( topicData.topics );

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ]( {
        topics: topicData.topics,
        activeTopicId: expectedTopic.id
      } );
      this.enzyme.state( 'topic' ).should.eql( expectedTopic );

    } );

  } );

  describe( 'MainDetail rendering', function() {

    before( () => {

      this.component = <MainDetail />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it( 'should render the correct data', () => {

      const topic = topicData.topics[ 0 ];

      this.enzyme.setState( {
        topic: topic
      } );

      this.enzyme.find( '.section-header__label' ).text().should.eql( topic.label );
      this.enzyme.find( '.sentiment-score' ).text().should.eql( topic.sentimentScore.toString() );
      this.enzyme.find( DayListMock ).props().should.have.property( 'days' );
      this.enzyme.find( SentimentMock ).length.should.eql( 3 );
      this.enzyme.find( SentimentMock ).forEach( sentiment => {
        sentiment.props().should.have.properties( [ 'sentiment', 'value' ] );
      } );

    } );

    it( 'should render empty if there is no topic', () => {

      this.enzyme.setState( {
        topic: null
      } );

      this.enzyme.children().should.have.length( 0 );

    } );

  } );

} );
