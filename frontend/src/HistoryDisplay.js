import React from 'react';

import Login from './Login';

import './HistoryDisplay.css';

const rightArrow = <span>&#10140;&nbsp;</span>

class HistoryDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showLogin: false};
  }

  activateLogin = () => {
    this.setState({showLogin: true});
  }

  render() {
    const historyItems = this.props.historyItems;
    const historyItemDisplays = historyItems.map((historyItem, index) => 
      <li key={index}>
        {historyItem.isHeads ? "Heads" : "Tails"}&nbsp;
        <span className="rightAligned">{historyItem.dateTime.toLocaleString()}</span>
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
        {this.state.showLogin &&
          <Login />
        }
        <ul>{historyItemDisplays}</ul>
        <p>Save your history by signing in or making an account!</p>
      </div>
    );
  }
}

export default HistoryDisplay;
