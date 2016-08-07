// External dependencies
import React from 'react';


// Dependencies
import MainBody from './main-body';
import MainDetail from './main-detail';


/**
 * Main component
 * Stateless function
 */
const Main = props => {
  return (
    <div className="wrapper">
      <main className="main">
        <MainBody />
        <MainDetail />
      </main>
    </div>
  );
};


// Exports
export default Main;
