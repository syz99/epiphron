import React, { Component } from "react";
import "../css/LogSign.css";
import logo from "../img/logo.svg";
import { Link } from "react-router-dom";

class LogSign extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <Link to="/dashboard">
          <button class="logsign">MESSAGE</button>
        </Link>
      </div>
    );
  }
}

export default LogSign;
