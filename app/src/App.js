import React, { Component } from "react";
import logo from "./logo.png";
import "./App.css";
import LogSign from "./LogSign";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <LogSign text="Login" />
          <LogSign text="Sign Up" />
        </header>
      </div>
    );
  }
}

export default App;
