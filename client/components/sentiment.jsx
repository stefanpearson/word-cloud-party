// External dependencies
import React from 'react';


// Dependencies
import * as utils from '../lib/utils';


/**
 * Sentiment component
 * Stateless function
 */
const Sentiment = props => {

  const sentimentClasses = {
    'sentiment': true
  };

  sentimentClasses[ 'sentiment--' + props.sentiment ] = true;

  return (
    <div className={ utils.toClass( sentimentClasses ) }>
      <span className="sentiment__icon"></span>
      <span className="sentiment__value">{ props.value || 0 }</span>
    </div>
  );
};


// Exports
export default Sentiment;
