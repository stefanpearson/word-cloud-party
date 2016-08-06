// External dependencies
import React from 'react';


// Dependencies
import WordCloud from './word-cloud';


/**
 * Main Body component
 * Stateless function
 */
let MainBody = props => {
  return (
    <div className="main__body">
      <header className="header">
        <h1>Topics</h1>
      </header>
      <WordCloud />
    </div>
  );
};


// Exports
export default MainBody;
