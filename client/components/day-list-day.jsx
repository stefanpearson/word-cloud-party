// External dependencies
import React from 'react';


// Dependencies
import * as utils from '../lib/utils';
import Bar from './bar';


/**
 * Day component
 * Stateless function
 */
const DayListDay = props => {

  const barProps = {
    value: Math.round( ( props.volume / props.maxVolume ) * 100 ),
    label: props.volume
  };

  return (
    <div className="day-list__item">
      <div className="day-list__item__label">{ utils.formatDate( props.date ) }</div>
      <div className="day-list__item__value">
        <Bar { ...barProps } />
      </div>
    </div>
  );
};


// Exports
export default DayListDay;
