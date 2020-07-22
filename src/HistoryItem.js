import React from 'react';

class HistoryItem extends React.Component {
  render() {
    return <div>{this.props.type}: {this.props.result}</div>
  }
}

export default HistoryItem;
