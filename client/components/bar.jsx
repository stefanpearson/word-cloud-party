// External dependencies
import React from 'react';


// Dependencies
//


/**
 * Bar component
 * Stateless function
 */
const Bar = props => {
  return (
    <div className="bar">
      <div className="bar__value" style={ { width: props.value + '%' } }>
        <div className="bar__label">{ props.label }</div>
      </div>
    </div>
  );
};


// Exports
export default Bar;
