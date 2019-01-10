import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./LoginForm"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: ""
    };
  }

  userHasAuthenticated = userid => {
    this.setState({ id: userid });
  }

  render() {
    const childProps = {
      id: this.state.id,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LoginForm childProps={childProps} />
        </header>
      </div>
    );
  }
}

export default App;
