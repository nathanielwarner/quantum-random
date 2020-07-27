import React from 'react';
import axios from 'axios';

import UniverseActionsForm from './UniverseActionsForm';
import GoButton from './GoButton';
import HistoryItem from './HistoryItem';
import HistoryDisplay from './HistoryDisplay';
import './App.css';
import Login from './Login';
import Clock from './Clock';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      awaitingResult: false,
      gotResult: false,
      headsAction: "Ask that special someone out",
      tailsAction: "Watch Netflix",
      history: []
    };
  }

  handleHeadsActionChange = (e) => {
    this.setState({headsAction: e.target.value});
  }

  handleTailsActionChange = (e) => {
    this.setState({tailsAction: e.target.value});
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
          callback(-1);
        });
  }

  pushNewResult = (result) => {
    let history = this.state.history;
    history.push(result);
    this.setState({history: history, gotResult: true});
  }

  showError = (errCode) => {
    alert("Error");
  }

  coinFlipCallback = (result) => {
    switch (result) {
      case 0:
        this.pushNewResult(new HistoryItem(true, this.state.headsAction, this.state.tailsAction));
        break;
      case 1:
        this.pushNewResult(new HistoryItem(false, this.state.headsAction, this.state.tailsAction));
        break;
      default:
        this.showError(result);
        break;
    }
    this.setState({awaitingResult: false, headsAction: "", tailsAction: ""});
  }

  handleGoPress = (e) => {
    this.setState({awaitingResult: true});
    this.getQuantumRandomSelection(2, this.coinFlipCallback);
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
            Quantum Coin Flip
          </h1>
        </header>
        <div className="App-body">
          <p>Your source for <b>truly random</b> coin flips, obtained from quantum fluctuations.</p>
          <UniverseActionsForm headsAction={this.state.headsAction} tailsAction={this.state.tailsAction} 
                               handleHeadsActionChange={this.handleHeadsActionChange} 
                               handleTailsActionChange={this.handleTailsActionChange} />
          <GoButton awaitingResult={this.state.awaitingResult} gotResult={this.state.gotResult} lastResult={lastResult} handleClick={this.handleGoPress} />
          {this.state.history.length > 0 &&
            <HistoryDisplay historyItems={this.state.history} />
          }
          <Login />
          <Clock />
        </div>
      </div>
    );
  }
}

export default App;
