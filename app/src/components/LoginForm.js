import React, { Component } from "react";
import logo from "../img/logo.svg";
import "../css/index.css";
import { Redirect } from "react-router-dom";
import firebase from "./Firestore";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userid: "",
      newid: "",
      submitted: false,
      isParent: false,
      show_overlay: false,
      name: "",
      email: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var test = db
      .collection("parents")
      .where("parent_id", "==", this.state.userid)
      .get()
      .then(snapshot => {
        var found = false;
        snapshot.forEach(parent => {
          found = true;
          this.props.childProps.userHasAuthenticated(this.state.userid);
          this.setState({ isParent: true });
          this.setState({ submitted: true });
        });
        if (!found) {
          var test = db
            .collection("parents")
            .where("child_id", "==", this.state.userid)
            .get()
            .then(snapshot => {
              snapshot.forEach(parent => {
                found = true;
                this.props.childProps.userHasAuthenticated(this.state.userid);
                this.setState({ isParent: false });
                this.setState({ submitted: true });
              });
              if (!found) {
                alert("Invalid ID: Create an account");
              }
            })
            .catch(err => alert("Internal Server Error: Wait and retry"));
        }
      })
      .catch(err => alert("Internal Server Error: Wait and retry"));
  };

  createAccount = event => {
    event.preventDefault();
    if (
      this.state.name == "" ||
      this.state.email == "" ||
      this.state.newid == ""
    ) {
      alert("Please make sure all fields are filled");
    } else {
      // Firebase stuff
      const db = firebase.firestore();
      db.settings({
        timestampsInSnapshots: true
      });
      const userRef = db.collection("parents").add({
        name: this.state.name,
        email: this.state.email,
        parent_id: this.state.newid
      });

      // Go to dashboard/login
      this.props.childProps.userHasAuthenticated(this.state.newid);
      this.setState({ isParent: true });
      this.setState({ submitted: true });
    }
  };

  openOverlay = event => {
    this.setState({ show_overlay: true });
  };

  render() {
    return this.state.submitted ? (
      <Redirect to="/dashboard" />
    ) : (
      <div>
        <div
          style={{
            display: this.state.show_overlay === true ? "block" : "none"
          }}
        >
          <div className="overlay" />
          <div className="modal">
            <p style={{ lineHeight: "20px" }}>Create an Account</p>
            <form
              style={{
                lineHeight: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "60%"
              }}
            >
              <input
                name="name"
                type="text"
                value={this.state.name}
                placeholder="Enter Full Name"
                onChange={event => {
                  this.handleChange(event);
                }}
              />
              <input
                type="email"
                name="email"
                value={this.state.email}
                placeholder="Enter Email"
                onChange={event => {
                  this.handleChange(event);
                }}
              />
              <input
                type="text"
                name="newid"
                value={this.state.newid}
                placeholder="Enter Account Number"
                onChange={event => {
                  this.handleChange(event);
                }}
              />
              <button
                style={{ lineHeight: "10px" }}
                onClick={event => {
                  this.createAccount(event);
                }}
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <form>
            <input
              type="text"
              name="userid"
              value={this.state.userid}
              placeholder="Enter Account Number"
              onChange={event => {
                this.handleChange(event);
              }}
            />
          </form>
          <button
            onClick={event => {
              this.handleSubmit(event);
            }}
          >
            Login
          </button>
          <div>
            <button
              onClick={event => {
                this.openOverlay(event);
              }}
            >
              Create an Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
