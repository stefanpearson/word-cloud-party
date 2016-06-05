// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' ),
    Bar = require( './bar' );


/**
 * Day component
 * TODO: compute properties and pass through to bar
 */
var DayListDay = React.createClass( {
  render: function render() {
    return (
      <div className="day-list__item">
        <div className="day-list__item__label">{ this.props.label }</div>
        <div className="day-list__item__value">
          <Bar />
        </div>
      </div>
    );
  }
} );


// Exports
module.exports = DayListDay;
