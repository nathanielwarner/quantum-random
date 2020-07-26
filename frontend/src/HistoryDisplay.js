import React from 'react';

import './HistoryDisplay.css';

class HistoryDisplay extends React.Component {
  render() {
    const historyItems = this.props.historyItems;
    const historyItemDisplays = historyItems.map((historyItem, index) => 
      <li key={index}>{historyItem.isHeads ? "Heads" : "Tails"}
        {historyItem.headsAction && historyItem.tailsAction &&
          <div className="universe-outcomes">
            <div className={historyItem.isHeads ? "our-universe" : "parallel-universe"}>
              {historyItem.headsAction}
            </div>
            <div className={historyItem.isHeads ? "parallel-universe" : "our-universe"}>
              {historyItem.tailsAction}
            </div>
          </div>
        }
      </li>
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
