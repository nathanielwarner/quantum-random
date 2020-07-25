import React from 'react';
import axios from 'axios';

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
      buttonPushed: false,
      history: [
        {"type": "coinFlip", "result": "Heads"},
        {"type": "coinFlip", "result": "Heads"},
        {"type": "coinFlip", "result": "Tails"},
        {"type": "diceRollD8", "result": "4"},
        {"type": "coinFlip", "result": "Heads"}
      ]
    };
  }

  handleRandTypeChange = (e) => {
    this.setState({randType: e.target.value});
  }

  getQuantumRandomSelection(numClasses, callback) {
    axios.get("api/qrng?numClasses=" + numClasses)
      .then(
        res => {
          const result = res.data.result;
          callback(result);
        },
        error => {
          console.log(error);
          callback(-2);
        });
  }

  pushNewResult = (resultType, resultText) => {
    let history = this.state.history;
    const newItem = {"type": resultType, "result": resultText};
    history.push(newItem);
    this.setState({history: history, buttonPushed: true});
  }

  pushAPIErrorResult = () => {
    this.pushNewResult("error", "API Call Failed");
  }

  pushUnexpectedErrorResult = () => {
    this.pushNewResult("error", "Unexpected Error");
  }

  coinFlipCallback = (result) => {
    switch (result) {
      case 0:
        this.pushNewResult("coinFlip", "Heads");
        break;
      case 1:
        this.pushNewResult("coinFlip", "Tails");
        break;
      default:
        this.pushAPIErrorResult();
        break;
    }
  }

  diceRollD6Callback = (result) => {
    if (result < 0) {
      this.pushAPIErrorResult();
    } else {
      this.pushNewResult("diceRollD8", (result + 1).toString());
    }
  }

  handleGoPress = (e) => {
    switch (this.state.randType) {
      case "coinFlip":
        this.getQuantumRandomSelection(2, this.coinFlipCallback);
        break;
      case "diceRollD8":
        this.getQuantumRandomSelection(8, this.diceRollD6Callback);
        break;
      default:
        this.pushUnexpectedErrorResult();
        break;
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
          <GoButton pushed={this.state.buttonPushed} lastResult={lastResult} handleClick={this.handleGoPress} />
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
