import React from 'react';


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
        <button onClick={isLoggedIn ? this.handleLogoutClick : this.handleLoginClick}>
          {isLoggedIn ? "Log Out" : "Log In"}
        </button>&nbsp;
        {isLoggedIn ? null : "Making an account helps us out!"}
      </div>
    );
  }
}

export default Login;
