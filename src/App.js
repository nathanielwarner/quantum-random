import React from 'react';
import Login from './Login';
import Clock from './Clock';
import Toggle from './Toggle';
import History from './History';
import './App.css';
import RandTypeSelector from './RandTypeSelector';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src="quaternion_512.png" className="App-logo" alt="logo" />
          <h1>
            Quantum RNG
          </h1>
        </header>
        <div className="App-body">
          <p>Your source for <b>truly random</b> numbers, coin tosses, and dice rolls.</p>
          <Login />
          <Clock />
          <RandTypeSelector />
          <Toggle />
          <History historyItems={[
            {"id": 0, "type": "Coin Flip", "result": "Heads"},
            {"id": 1, "type": "Coin Flip", "result": "Heads"},
            {"id": 2, "type": "Coin Flip", "result": "Tails"},
            {"id": 3, "type": "Dice Roll d6", "result": "4"}
            ]} />
        </div>
      </div>
    );
  }
}

export default App;
