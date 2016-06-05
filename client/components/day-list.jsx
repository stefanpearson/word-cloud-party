// External dependencies
var React = require( 'react' );


// Dependencies
var DayListDay = require( './day-list-day' );


/**
 * Day List component
 * TODO: loop through days
 */
var DayList = React.createClass( {
  render: function render() {
    return (
      <div className="day-list">
        <DayListDay />
      </div>
    );
  }
} );


// Exports
module.exports = DayList;
