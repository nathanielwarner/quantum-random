import React from 'react';
import {FaTrash} from 'react-icons/fa';

import HistoryTree from './HistoryTree';

import './History.css';

const rightArrow = <span>&#10140;&nbsp;</span>

class History extends React.Component {
  render() {
    const historyItems = this.props.historyItems;
    const historyItemDisplays = historyItems.map((historyItem, index) => 
      <li key={index}>
        <div className="HistoryHeader">
          {historyItem.isHeads ? "Heads" : "Tails"}&nbsp;
          <span className="rightAligned">
            {(new Date(historyItem.dateTime)).toLocaleString()}&nbsp;&nbsp;
            <button className="HistoryDeleteButton" itemident={index} onClick={this.props.onDeleteClick}>
              <FaTrash />
            </button>
          </span>
        </div>
        {historyItem.headsAction && historyItem.tailsAction &&
          <div className="universe-outcomes">
            <div className={historyItem.isHeads ? "our-universe" : "parallel-universe"}>
              {historyItem.isHeads && rightArrow}
              {historyItem.headsAction}
            </div>
            <div className={historyItem.isHeads ? "parallel-universe" : "our-universe"}>
              {!(historyItem.isHeads) && rightArrow}
              {historyItem.tailsAction}
            </div>
          </div>
        }
      </li>
    );
    return (
      <div className="History">
        <h2>History</h2>
        <HistoryTree historyItems={this.props.historyItems} onDeleteClick={this.props.onDeleteClick} />
        <ul>{historyItemDisplays}</ul>
      </div>
    );
  }
}

export default History;
