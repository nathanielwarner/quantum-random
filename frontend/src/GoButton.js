import React from 'react';

import './GoButton.css';

class GoButton extends React.Component {
  render() {
    let text;
    if (this.props.awaitingResult) {
      text = "Please wait...";
    } else if (this.props.gotResult) {
      if (this.props.lastResult.isHeads) {
        text = "Heads";
      } else {
        text = "Tails";
      }
    } else {
      text = "Flip";
    }
    return (
      <button className={`GoButton ${this.props.awaitingResult ? "disabled-btn" : ""}`} onClick={this.props.handleClick}>
        {text}
      </button>
    );
  }
}

export default GoButton;
