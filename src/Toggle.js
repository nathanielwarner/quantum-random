import React from 'react';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.counter = 0
    this.state = {isToggleOn: false, numDisplay: 0};
  }

  handleClick = () => {
    this.counter++;
    this.setState(state => ({
      isToggleOn: !state.isToggleOn,
      numDisplay: this.counter * this.counter
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {(this.state.isToggleOn ? 'ON' : 'OFF') + ' (' + this.state.numDisplay + ')'}
      </button>
    );
  }
}

export default Toggle;
