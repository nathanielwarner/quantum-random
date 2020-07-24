import React from 'react';

class HistoryDisplay extends React.Component {
  render() {
    const historyItems = this.props.historyItems;
    const historyItemDisplays = historyItems.map((historyItem, index) => 
      <li key={index}>{historyItem.type}: {historyItem.result}</li>
    );
    return (
      <div className="History">
        <h2>History</h2>
        <ul>{historyItemDisplays}</ul>
      </div>
    );
  }
}

export default HistoryDisplay;
