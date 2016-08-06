// External dependencies
import nock from 'nock';


// Dependencies
import environment from '../../../client/lib/environment';
import topicData from '../../../data/topics';


// Test module
import * as api from '../../../client/data/api';


describe( 'Client: API data manager', function() {

  before( function() {

    this.expectedTopics = topicData.topics;
    this.expectedTopic = this.expectedTopics[ 0 ];

    // Nock the expected HTTP requests
    nock( environment.baseUrl ).get( '/api/topics' ).reply( 200, this.expectedTopics );
    nock( environment.baseUrl ).get( '/api/topics/' + this.expectedTopic.id ).reply( 200, this.expectedTopic );

  } );

  after( function() {
    nock.cleanAll();
  } );

  describe( 'Retrieving topics', function() {

    it( 'should retrieve the topics from the API', function( done ) {

      api.getTopics()
        .then( function( topics ) {

          topics.should.be.an.Array;
          topics.should.have.length( this.expectedTopics.length );

          return done();
        }.bind( this ) );

    } );

    it( 'should retrieve a single topic from the API', function( done ) {

      api.getTopicById( this.expectedTopic.id )
        .then( function( topic ) {

          topic.should.be.an.Object;
          topic.should.have.properties( { id: this.expectedTopic.id } );

          return done();
        }.bind( this ) );

    } );

  } );

} );
