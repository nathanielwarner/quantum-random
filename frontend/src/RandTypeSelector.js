import React from 'react';

function RandTypeSelector(props) {
  return (
    <select value={props.selected} onChange={props.onChange}>
      <option value="coinFlip">Coin Flip</option>
      <option value="diceRoll">Dice Roll d6</option>
      <option value="randNum">Random Numbers</option>
    </select>
  );
}

export default RandTypeSelector;
