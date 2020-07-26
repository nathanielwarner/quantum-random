import React from 'react';

function RandTypeSelector(props) {
  return (
    <div className="RandTypeSelector">
      <select value={props.selected} onChange={props.onChange}>
        <option value="coinFlip">Coin Flip</option>
        <option value="diceRoll">Dice Roll</option>
        <option value="randNum">Random Numbers</option>
      </select>
      {props.selected === "diceRoll"
        ? <label>
            d
            <input type="text" value={props.diceType} onChange={props.onDiceTypeChange}/>
          </label>
        : null
      }
    </div>
  );
}

export default RandTypeSelector;
