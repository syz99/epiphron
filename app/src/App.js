import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import LogSign from "./LogSign";
import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Router>
            <Link to="/dashboard">
              <LogSign text="Login" />
            </Link>
            <Link to="/dashboard">
              <LogSign text="Sign Up" />
            </Link>

            <Route path="/dashboard" component={Dashboard} />
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
