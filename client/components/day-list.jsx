// External dependencies
var React = require( 'react' ),
    _ = require( 'lodash' );


// Dependencies
var DayListDay = require( './day-list-day' );


/**
 * Day List component
 */
var DayList = React.createClass( {

  /**
   * Render!
   */
  render: function render() {
    var maxVolume = _.maxBy( this.props.days, 'volume' ).volume;

    return (
      <div className="day-list">
        {
          _.map( this.props.days, function( day, index ) {
            return (
              <DayListDay key={ index } { ...day } maxVolume={ maxVolume } />
            );
          }.bind( this ) )
        }
      </div>
    );
  }

} );


// Exports
module.exports = DayList;
