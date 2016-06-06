// External dependencies
var React = require( 'react' ),
    moment = require( 'moment' );


// Dependencies
var utils = require( '../lib/utils' ),
    Bar = require( './bar' );


/**
 * Day component
 */
var DayListDay = React.createClass( {

  /**
   * Render!
   */
  render: function render() {
    var bar = {
      value: Math.round( ( this.props.volume / this.props.maxVolume ) * 100 ),
      label: this.props.volume
    };

    return (
      <div className="day-list__item">
        <div className="day-list__item__label">{ DayListDay.formatDate( this.props.date ) }</div>
        <div className="day-list__item__value">
          <Bar { ...bar } />
        </div>
      </div>
    );
  },

  /**
   * Static methods
   */
  statics: {

    /**
     * Utility to format the date
     */
    formatDate: function formatDate( dateStr ) {
      return moment( dateStr ).format( 'D/M' );
    }

  }

} );


// Exports
module.exports = DayListDay;
