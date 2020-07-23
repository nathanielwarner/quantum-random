import React from 'react';
import LoginForm from './LoginForm';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  handleLoginClick = () => {
    this.setState({isLoggedIn: true});
  }

  handleLogoutClick = () => {
    this.setState({isLoggedIn: false});
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="Login">
        {isLoggedIn ? "Welcome Back!" : "Hi, Guest."}&nbsp;
        {isLoggedIn ? <button onClick={this.handleLogoutClick}>Log Out</button> : null}
        {isLoggedIn ? null : <LoginForm />}
      </div>
    );
  }
}

export default Login;
