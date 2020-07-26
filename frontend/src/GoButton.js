import React from 'react';

class GoButton extends React.Component {
  render() {
    let text;
    if (this.props.pushed) {
      if (this.props.lastResult.isHeads) {
        text = "Heads";
      } else {
        text = "Tails";
      }
    } else {
      text = "Push me!";
    }
    return (
      <button onClick={this.props.handleClick}>
        {text}
      </button>
    );
  }
}

export default GoButton;
