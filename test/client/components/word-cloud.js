// External dependencies
var React = require( 'react' ),
    enzyme = require( 'enzyme' ),
    proxyquire = require( 'proxyquire' ),
    sinon = require( 'sinon' ),
    _ = require( 'lodash' ),
    isSorted = require( 'compute-issorted' );


// Dependencies
var topicData = require( '../../../data/topics' ),
    utils = require( '../lib/utils' );


var mockModules = {
  './word-cloud-word': React.createClass( utils.mockComponent ),
  '../actions/topics': utils.mockTopicActions,
  '../stores/topics': utils.mockTopicStore
};


// Test module
var WordCloud = proxyquire( '../../../client/components/word-cloud.jsx', mockModules );


describe( 'Client: WordCloud component', function() {

  describe( 'WordCloud lifecycle', function() {

    before( function() {
      this.component = <WordCloud />;
      this.fetchTopicsSpy = sinon.spy( mockModules[ '../actions/topics' ], 'fetchTopics' );
      this.enzyme = enzyme.mount( this.component );
    } );

    after( function() {
      mockModules[ '../actions/topics' ].fetchTopics.restore();
    } );

    it( 'should trigger a fetchTopics action when mounted', function() {
      this.fetchTopicsSpy.callCount.should.eql( 1 );
    } );

    it.skip( 'should update the state when the topic store updates', function() {
      // TODO: figure out how to mock a topicStore event and watch state
    } );

  } );

  describe( 'WordCloud rendering', function() {

    before( function() {
      this.state = { topics: mockModules[ '../stores/topics' ].getState().topics };
      this.component = <WordCloud />;
      this.enzyme = enzyme.mount( this.component );
      this.enzyme.setState( this.state );
    } );

    it( 'should render a list of WordCloudWord components with the right properties', function() {
      var wordCloudWordComponents = this.enzyme.find( mockModules[ './word-cloud-word' ] );

      wordCloudWordComponents.length.should.eql( this.state.topics.length );

      wordCloudWordComponents.forEach( function( wordCloudWordComponent, index ) {
        var topic = this.state.topics[ index ],
            props = wordCloudWordComponent.props();

        props.should.have.properties( [ 'id', 'label', 'sentimentScore', 'weight' ] );
        props.should.have.properties( {
          id: topic.id,
          label: topic.label,
          sentimentScore: topic.sentimentScore
        } );
        props.weight.should.be.within( 1, 6 );

      }.bind( this ) );

    } );

  } );

  describe( 'WordCloud utilities', function() {

    before( function() {

      this.sortedTopicIds = WordCloud.sortTopicsByVolume( topicData.topics );
      this.sortedTopics = _.map( this.sortedTopicIds, function( value ) {
        return _.find( topicData.topics, { id: value } );
      } );

    } );

    it( 'should sort topics by volume', function() {
      var volumes = _.map( this.sortedTopics, function( topic ) {
        return topic.volume;
      } );

      isSorted( volumes ).should.be.true;

    } );

    it( 'should return a light weight if there is a low volume', function() {
      var topic = _.first( this.sortedTopics );

      WordCloud.getTopicWeight( topic, this.sortedTopicIds ).should.eql( 1 );

    } );

    it( 'should return a heavy weight if there is a high volume', function() {
      var topic = _.last( this.sortedTopics );

      WordCloud.getTopicWeight( topic, this.sortedTopicIds ).should.eql( 6 );

    } );

  } );

} );
