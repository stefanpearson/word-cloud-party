// External dependencies
import React from 'react';
import _ from 'lodash';


// Dependencies
import DayListDay from './day-list-day';


/**
 * Day List component
 * Stateless function
 */
const DayList = props => {

  const maxVolume = _.maxBy( props.days, 'volume' ).volume;

  const dayListDays = props.days.map( ( day, index ) => {
    return <DayListDay key={ index } { ...day } maxVolume={ maxVolume } />
  } );

  return (
    <div className="day-list">
      { dayListDays }
    </div>
  );
};


// Exports
export default DayList;
