// External dependencies
var React = require( 'react' );


// Dependencies
var utils = require( '../lib/utils' );


/**
 * Bar component
 */
var Bar = React.createClass( {
  render: function render() {
    return (
      <div className="bar">
        <div className="bar__value" style="width: { this.props.value || 0 }%;">
          <div className="bar__label">{ this.props.label || 0 }</div>
        </div>
      </div>
    );
  }
} );


// Exports
module.exports = Bar;
