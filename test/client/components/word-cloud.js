// External dependencies
import React from 'react';
import * as enzyme from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';
import isSorted from 'compute-issorted';


// Dependencies
import topicData from '../../../data/topics';
import * as utils from '../lib/utils';


// Test module
import WordCloud from '../../../client/components/word-cloud';


// Mock modules
const WordCloudWordMock = utils.createMockComponent();


describe( 'Client: WordCloud component', function() {

  before( () => {

    // Rewire dependencies to mocks
    WordCloud.__Rewire__( 'WordCloudWord', WordCloudWordMock );
    WordCloud.__Rewire__( 'topicActions', utils.mockTopicActions );
    WordCloud.__Rewire__( 'topicStore', utils.mockTopicStore );

  } );

  after( () => {

    // Reset dependencies
    WordCloud.__ResetDependency__( 'WordCloudWord' );
    WordCloud.__ResetDependency__( 'topicActions' );
    WordCloud.__ResetDependency__( 'topicStore' );

  } );

  describe( 'WordCloud lifecycle', function() {

    beforeEach( () => {

      this.component = <WordCloud />;
      this.fetchTopicsSpy = sinon.spy( utils.mockTopicActions, 'fetchTopics' );
      this.topicStoreListenerSpy = sinon.spy( utils.mockTopicStore, 'listen' );
      this.enzyme = enzyme.mount( this.component );

    } );

    afterEach( () => {

      utils.mockTopicActions.fetchTopics.restore();
      utils.mockTopicStore.listen.restore();

    } );

    it( 'should trigger a fetchTopics action when mounted', () => {
      this.fetchTopicsSpy.callCount.should.eql( 1 );
    } );

    it( 'should listen to the topic store', () => {

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ].should.be.a.Function;

    } );

    it( 'should update the state when the topic store updates the topics', () => {

      const expectedTopics = _.sampleSize( topicData.topics, 4 );

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ]( {
        topics: expectedTopics
      } );
      this.enzyme.state( 'topics' ).should.eql( expectedTopics );

    } );

  } );

  describe( 'WordCloud rendering', function() {

    beforeEach( () => {

      this.state = { topics: utils.mockTopicStore.getState().topics };
      this.component = <WordCloud />;
      this.enzyme = enzyme.mount( this.component );
      this.enzyme.setState( this.state );

    } );

    it( 'should render a list of WordCloudWord components with the right properties', () => {

      const wordCloudWordComponents = this.enzyme.find( WordCloudWordMock );

      wordCloudWordComponents.length.should.eql( this.state.topics.length );

      wordCloudWordComponents.forEach( ( wordCloudWordComponent, index ) => {

        const topic = this.state.topics[ index ];
        const props = wordCloudWordComponent.props();

        props.should.have.properties( [ 'id', 'label', 'sentimentScore', 'weight' ] );
        props.should.have.properties( {
          id: topic.id,
          label: topic.label,
          sentimentScore: topic.sentimentScore
        } );
        props.weight.should.be.within( 1, 6 );

      } );

    } );

  } );

  describe( 'WordCloud static utilities', function() {

    before( () => {

      this.sortedTopicIds = WordCloud.sortTopicsByVolume( topicData.topics );
      this.sortedTopics = this.sortedTopicIds.map( value => {
        return _.find( topicData.topics, { id: value } )
      } );

    } );

    it( 'should sort topics by volume', () => {

      const volumes = this.sortedTopics.map( topic => topic.volume );

      isSorted( volumes ).should.be.true;

    } );

    it( 'should return a heavy weight if there is a high volume', () => {

      const topic = _.first( this.sortedTopics );

      WordCloud.getTopicWeight( topic, this.sortedTopicIds ).should.eql( 1 );

    } );

    it( 'should return a light weight if there is a low volume', () => {

      const topic = _.last( this.sortedTopics );

      WordCloud.getTopicWeight( topic, this.sortedTopicIds ).should.eql( 6 );

    } );

  } );

} );
