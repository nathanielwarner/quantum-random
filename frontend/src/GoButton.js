import React from 'react';

class GoButton extends React.Component {
  render() {
    let text;
    if (this.props.pushed) {
      text = this.props.lastResult.result;
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
