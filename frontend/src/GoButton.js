import React from 'react';

class GoButton extends React.Component {
  render() {
    let text;
    if (this.props.gotResult) {
      if (this.props.lastResult.isHeads) {
        text = "Heads";
      } else {
        text = "Tails";
      }
    } else if (this.props.awaitingResult) {
      text = "Please wait...";
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
