// External dependencies
import React from 'react';
import enzyme from 'enzyme';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import _ from 'lodash';


// Dependencies
import topicData from '../../../data/topics';
import * as utils from '../lib/utils';


const mockModules = {
  './sentiment': React.createClass( utils.mockComponent ),
  './day-list': React.createClass( utils.mockComponent ),
  '../stores/topics': utils.mockTopicStore
};


// Test module
const MainDetail = proxyquire( '../../../client/components/main-detail.jsx', mockModules ).default;


describe( 'Client: MainDetail component', function() {

  describe( 'MainDetail lifecycle', function() {

    beforeEach( function() {

      this.topicStoreListenerSpy = sinon.spy( mockModules[ '../stores/topics' ], 'listen' );
      this.component = <MainDetail />;
      this.enzyme = enzyme.mount( this.component );

    } );

    afterEach( function() {
      mockModules[ '../stores/topics' ].listen.restore();
    } );

    it( 'should listen to the topic store', function() {

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ].should.be.a.Function;

    } );

    it( 'should update the state to be the updated active topic in the store', function() {
      var expectedTopic = _.sample( topicData.topics );

      this.topicStoreListenerSpy.callCount.should.eql( 1 );
      this.topicStoreListenerSpy.getCall( 0 ).args[ 0 ]( {
        topics: topicData.topics,
        activeTopicId: expectedTopic.id
      } );
      this.enzyme.state( 'topic' ).should.eql( expectedTopic );

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
