import React from 'react';

class History extends React.Component {
  render() {
    const historyItems = this.props.historyItems;
    const historyItemDisplays = historyItems.map((historyItem) => 
      <li key={historyItem.id}>{historyItem.type}: {historyItem.result}</li>
    );
    return (
      <div className="History">
        <h2>History</h2>
        <ul>{historyItemDisplays}</ul>
      </div>
    );
  }
}

export default History;
