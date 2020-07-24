import React from 'react';

class GoButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.handleClick}>
        {this.props.lastResult.result}
      </button>
    );
  }
}

export default GoButton;
