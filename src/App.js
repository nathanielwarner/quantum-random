import React from 'react';
import Login from './Login';
import Clock from './Clock';
import GoButton from './GoButton';
import HistoryDisplay from './HistoryDisplay';
import './App.css';
import RandTypeSelector from './RandTypeSelector';
import OutlinedBorder from './OutlinedBorder';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randType: "coinFlip", 
      history: [
        {"type": "coinFlip", "result": "Heads"},
        {"type": "coinFlip", "result": "Heads"},
        {"type": "coinFlip", "result": "Tails"},
        {"type": "diceRollD6", "result": "4"},
        {"type": "coinFlip", "result": "Heads"}
      ]
    };
  }

  handleRandTypeChange = (e) => {
    this.setState({randType: e.target.value});
  }

  handleGoPress = (e) => {
    if (false) {

    } else {
      let history = this.state.history;
      history.push({"type": "error", "result": "error"});
      this.setState({history: history});
    }
  }
  
  render() {
    const history = this.state.history;
    const lenHistory = history.length;
    const lastResult = lenHistory > 0 ? history[lenHistory - 1] : null;
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
          <RandTypeSelector selected={this.state.randType} onChange={this.handleRandTypeChange} />
          <GoButton lastResult={lastResult} handleClick={this.handleGoPress} />
          <Login />
          <Clock />
          <OutlinedBorder color="yellow" pre={
            <p>I go before!</p>
          }>
            <HistoryDisplay historyItems={this.state.history} />
          </OutlinedBorder>
        </div>
      </div>
    );
  }
}

export default App;
