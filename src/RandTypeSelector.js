import React from 'react';

class RandTypeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'coinFlip'};
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="coinFlip">Coin Flip</option>
        <option value="diceRoll">Dice Roll</option>
        <option value="randNum">Random Numbers</option>
      </select>
    );
  }
}

export default RandTypeSelector;
