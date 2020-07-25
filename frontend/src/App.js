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
        {"type": "diceRollD6", "result": "4"},
        {"type": "coinFlip", "result": "Heads"}
      ]
    };
  }

  handleRandTypeChange = (e) => {
    this.setState({randType: e.target.value});
  }

  getQuantumRandomSelection(numClasses, callback) {
    const length = numClasses - 1;
    axios.get(
      "https://qrng.anu.edu.au/API/jsonI.php?length=" + length + "&type=uint8"
    )
      .then(res => res.data)
      .then(
        (result) => {
          console.log(result);
          if (result.success === true && result.type === "uint8" && result.length === length) {
            const mapped = result.data.map(x => x < 128 ? 0 : 1);
            const sum = mapped.reduce((a, b) => a + b);
            callback(sum);
          }
        },
        (error) => {
          console.log("Failed to make request to quantum API");
          console.log(error);
          callback(-1);
        }
      );
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

  handleGoPress = (e) => {
    switch (this.state.randType) {
      case "coinFlip":
        this.getQuantumRandomSelection(2, this.coinFlipCallback);
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
