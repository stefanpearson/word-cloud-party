// External dependencies
import React from 'react';
import * as enzyme from 'enzyme';
import sinon from 'sinon';
import _ from 'lodash';


// Dependencies
import topicData from '../../../data/topics';
import * as utils from '../lib/utils';


// Test module
import WordCloudWord from '../../../client/components/word-cloud-word';


describe( 'Client: WordCloudWord component', function() {

  before( () => {

    // Rewire dependencies to mocks
    WordCloudWord.__Rewire__( 'topicActions', utils.mockTopicActions );
    WordCloudWord.__Rewire__( 'topicStore', utils.mockTopicStore );

  } );

  after( () => {

    // Reset dependencies
    WordCloudWord.__ResetDependency__( 'topicActions' );
    WordCloudWord.__ResetDependency__( 'topicStore' );

  } );

  describe( 'WordCloudWord lifecycle', function() {

    beforeEach( () => {

      const props = {
        id: topicData.topics[ 0 ].id
      };

      this.topicStoreListenerSpy = sinon.spy( utils.mockTopicStore, 'listen' );
      this.component = <WordCloudWord { ...props } />;
      this.enzyme = enzyme.mount( this.component );

    } );

    afterEach( () => {
      utils.mockTopicStore.listen.restore();
    } );

    it( 'should have an active state if it matches the active topic in the store when mounted', () => {
      this.enzyme.state( 'isActive' ).should.eql( true );
    } );

    it( 'should trigger the updateActiveTopicId action on click', () => {

      const updateActiveTopicIdActionSpy = sinon.spy( utils.mockTopicActions, 'updateActiveTopicId' );

      this.enzyme.simulate( 'click' );

      updateActiveTopicIdActionSpy.callCount.should.eql( 1 );
      updateActiveTopicIdActionSpy.getCall( 0 ).args[ 0 ].should.eql( this.enzyme.props().id );

      utils.mockTopicActions.updateActiveTopicId.restore();

    } );

    it( 'should listen to the topic store', () => {

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ].should.be.a.Function;

    } );

    it( 'should update the state to be inactive when it doesn\'t match the updated active topic in the store', () => {

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ]( {
        activeTopicId: '123'
      } );
      this.enzyme.state( 'isActive' ).should.eql( false );

    } );

  } );

  describe( 'WordCloudWord rendering', function() {

    before( () => {

      this.component = <WordCloudWord />;
      this.enzyme = enzyme.mount( this.component );

    } );

    it( 'should render as active when the state is active', () => {

      this.enzyme.setState( { isActive: true } );

      this.enzyme.hasClass( 'is-active' ).should.be.true;

    } );

    it( 'should render as inactive when the state is inactive', () => {

      this.enzyme.setState( { isActive: false } );

      this.enzyme.hasClass( 'is-active' ).should.be.false;

    } );

    it( 'should render as positive when the topic has a positive sentiment', () => {

      this.enzyme.setProps( { sentimentScore: 60 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.true;
      this.enzyme.hasClass( 'word--neutral' ).should.be.false;
      this.enzyme.hasClass( 'word--negative' ).should.be.false;

    } );

    it( 'should render as neutral when the topic has a neutral sentiment', () => {

      this.enzyme.setProps( { sentimentScore: 40 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.false;
      this.enzyme.hasClass( 'word--neutral' ).should.be.true;
      this.enzyme.hasClass( 'word--negative' ).should.be.false;

    } );

    it( 'should render as negative when the topic has a negative sentiment', () => {

      this.enzyme.setProps( { sentimentScore: 39 } );

      this.enzyme.hasClass( 'word--positive' ).should.be.false;
      this.enzyme.hasClass( 'word--neutral' ).should.be.false;
      this.enzyme.hasClass( 'word--negative' ).should.be.true;

    } );

    it( 'should render the correct weight', () => {

      _.times( index => {

        const weight = index + 1;

        this.enzyme.setProps( { weight: weight } );

        this.enzyme.hasClass( 'word--' + weight ).should.be.true;
        this.enzyme.hasClass( 'word--' + ( weight - 1 ) ).should.be.false;

      }, 6 );

    } );

  } );

} );
