import React from 'react';

import './AuxiliaryDisplay.css';

function AuxiliaryDisplay(props) {
  return (
    <div className="AuxiliaryDisplay">
      <p><b>{props.text}</b></p>
      {props.showError && 
        <p>Sorry for the inconvenience. Please try again later.</p>}
    </div>
  );
}

export default AuxiliaryDisplay;
