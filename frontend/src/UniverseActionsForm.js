import React from 'react';

import './UniverseActionsForm.css';

function UniverseActionsForm(props) {
  return (
    <div className="UniverseActionsForm">
      <label>
        If I Get <b>Heads</b>, I will:
        <input type="text" value={props.headsAction} onChange={props.handleHeadsActionChange} size="40"/>
      </label>
      <label>
        If I Get <b>Tails</b>, I will:
        <input type="text" value={props.tailsAction} onChange={props.handleTailsActionChange} size="40"/>
      </label>
    </div>
  );
}

export default UniverseActionsForm;
