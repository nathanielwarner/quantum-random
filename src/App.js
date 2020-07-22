import React from 'react';
import Clock from './Clock';
import HistoryItem from './HistoryItem';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="kaleidoscopic_ifs_512.png" className="App-logo" alt="logo" />
          <h1>
            Quantum RNG
          </h1>
        </header>
        <body className="App-body">
          <p>Your source for <b>truly random</b> numbers, coin tosses, and dice rolls.</p>
          <Clock />
          <h2>History</h2>
          <ul>
            <li><HistoryItem type="Coin Flip" result="Heads" /></li>
            <li><HistoryItem type="Coin Flip" result="Tails" /></li>
            <li><HistoryItem type="Coin Flip" result="Tails" /></li>
          </ul>
        </body>
      </div>
    );
  }
}

export default App;
