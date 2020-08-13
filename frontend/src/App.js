import React from 'react';
import axios from 'axios';

import UniverseActionsForm from './UniverseActionsForm';
import HistoryItem from './HistoryItem';
import History from './History';
import './App.css';
import Coin from './Coin';
import FAQs from './FAQs';
import AuxiliaryDisplay from './AuxiliaryDisplay';

async function getQuantumRandomSelection(numClasses) {
  const response = await axios.get("api/qrng?numClasses=" + numClasses);
  const result = response.data.result;
  return result;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem("history")) {
      localStorage.setItem("history", `[
        {"dateTime": 1597086556579, "isHeads": false, "headsAction": "Watch a movie", "tailsAction": "Read a book"},
        {"dateTime": 1593086539392, "isHeads": true, "headsAction": "Do nothing", "tailsAction": "Do something"},
        {"dateTime": 1597086656579, "isHeads": true, "headsAction": "Eat pizza", "tailsAction": "Eat something healthy"}
      ]`);
    }
    this.state = {
      awaitingResult: false,
      gotResult: false,
      headsAction: "Ask that special someone out",
      tailsAction: "Watch Netflix",
      auxDisplay: "Last action test",
      showError: false,
      history: JSON.parse(localStorage.getItem("history"))
    };
  }

  handleHeadsActionChange = (e) => {
    this.setState({headsAction: e.target.value});
  }

  handleTailsActionChange = (e) => {
    this.setState({tailsAction: e.target.value});
  }

  pushNewResult = (result) => {
    const newAction = result.isHeads ? result.headsAction : result.tailsAction;
    let history = this.state.history;
    history.push(result);
    this.setState({history: history, awaitingResult: false, headsAction: "", tailsAction: "", gotResult: true, showError: false, auxDisplay: newAction});
    localStorage.setItem("history", JSON.stringify(history));
  }

  showError = (message) => {
    this.setState({awaitingResult: false, showError: true, auxDisplay: message, gotResult: false});
  }

  coinFlipCallback = (result) => {
    switch (result) {
      case 0:
        this.pushNewResult(new HistoryItem(Date.now(), true, this.state.headsAction, this.state.tailsAction));
        break;
      case 1:
        this.pushNewResult(new HistoryItem(Date.now(), false, this.state.headsAction, this.state.tailsAction));
        break;
      default:
        this.showError("Quantum API call did not work");
        break;
    }
  }

  handleGoPress = (e) => {
    this.setState({awaitingResult: true});
    getQuantumRandomSelection(2)
      .then(result => this.coinFlipCallback(result))
      .catch(error => this.showError("Unable to make request to backend"));
  }

  handleHistoryDeleteClick = (e) => {
    const id = e.currentTarget.getAttribute("itemident");
    let history = this.state.history;
    history.splice(id, 1);
    this.setState({history: history});
  }
  
  render() {
    const history = this.state.history;
    const lastResult = history.length > 0 ? history[history.length - 1] : null;
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
          <Coin awaitingResult={this.state.awaitingResult} gotResult={this.state.gotResult} lastResult={lastResult} handleClick={this.handleGoPress} />
          <AuxiliaryDisplay text={this.state.auxDisplay} showError={this.state.showError} />
          {history.length > 0 &&
            <History historyItems={history} onDeleteClick={this.handleHistoryDeleteClick} />
          }
          <FAQs />
        </div>
      </div>
    );
  }
}

export default App;
