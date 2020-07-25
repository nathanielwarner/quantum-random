import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {ticks: 0};
  }

  tick() {
    this.setState((state, props) => ({
      ticks: state.ticks + 1
    }));
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <p>You've been here for {this.state.ticks} seconds.</p>
    );
  }
}

export default Clock;
