import React from 'react';

function UniverseActionsForm(props) {
  return (
    <div className="UniverseActionsForm">
      <label>
        If Heads:
        <input type="text" value={props.headsAction} onChange={props.handleHeadsActionChange}/>
      </label>
      <label>
        If Tails:
        <input type="text" value={props.tailsAction} onChange={props.handleTailsActionChange}/>
      </label>
    </div>
  );
}

export default UniverseActionsForm;
