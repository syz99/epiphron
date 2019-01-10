import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import LogSign from "./LogSign";
import Dashboard from "./Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Route path="/dashboard" component={Dashboard} />

              {/* <Route
                path="/login"
                render={() => (
                  <Link to="/dashboard">
                    <LogSign text="Login" />
                  </Link>
                )}
              /> */}

              <Route path="/" component={LogSign} />
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
