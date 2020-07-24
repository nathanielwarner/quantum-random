import React from 'react';
import LoginForm from './LoginForm';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false, userName: null};
  }

  handleLoginClick = (username) => {
    this.setState({isLoggedIn: true, userName: username});
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="Login">
        {isLoggedIn ? "Welcome Back " + this.state.userName + "!" : "Hi, Guest."}&nbsp;
        {isLoggedIn ? <button onClick={this.handleLogoutClick}>Log Out</button> : null}
        {isLoggedIn ? null : <LoginForm onLoginClick={this.handleLoginClick} />}
      </div>
    );
  }
}

export default Login;
