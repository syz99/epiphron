import React, { Component } from "react";
import logo from "../img/logo.svg";
import "../css/index.css";

class Dashboard extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          position: "relative",
          color: "white"
        }}
      >
        <div className="column" style={{ flexGrow: "1" }}>
          <br />
          <img
            src={logo}
            style={{ height: 100 + "px", alignContent: "center" }}
            className="App-logo"
            alt="logo"
          />
          <br />
          <br />
          <div style={{ textAlign: "left" }}>
            <h1 class="font" s>
              Monthly Allowance
            </h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <input type="text" name="allowance" />
              {/* <input type="submit" value="Send Request" /> */}
              <button
                style={{ lineHeight: "10px" }}
                onClick={event => {
                  this.createAccount(event);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <h1>Threshold</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <input type="text" name="threshold" />
              {/* <input type="submit" value="Send Request" /> */}
              <button
                style={{ lineHeight: "10px" }}
                onClick={event => {
                  this.createAccount(event);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  <path d="M0 0h24v24H0z" fill="none" />
                </svg>
              </button>
            </div>
          </div>

          <div style={{ textAlign: "left" }}>
            <h1>Total Spendings</h1>
          </div>
        </div>

        <div className="column" style={{ flexGrow: "3" }}>
          One Third
        </div>
      </div>
    );
  }
}

export default Dashboard;
