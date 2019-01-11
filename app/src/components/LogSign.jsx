import React, { Component } from "react";
import "../css/LogSign.css";
// import logo from "../img/logo1.svg";
import { Link } from "react-router-dom";

class LogSign extends Component {
  render() {
    return (
      <div>
        <div>
          <Link to="/">
            <img src="../img/logo1.svg" className="App-logo" alt="logo" />
          </Link>
        </div>

        <Link to="/dashboard">
          <button class="logsign">MESSAGE</button>
        </Link>
      </div>
    );
  }
}

export default LogSign;
