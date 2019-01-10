import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./css/App.css";
import LoginForm from "./components/LoginForm";
import LogSign from "./components/LogSign";
import Dashboard from "./components/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Route path="/dashboard" component={Dashboard} />

              <Route path="/" component={LogSign} />
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
