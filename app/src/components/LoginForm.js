import React, { Component } from "react";
import logo from "../img/logo.svg";
import "../css/index.css";
import { Redirect } from "react-router-dom"

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userid: "",
      submitted: false,
      show_overlay: false,
      name: "",
      email: ""
    };
  }

  handleChange = event => {
    this.setState({
      userid: event.target.value
    });
    console.log(event.target.value);
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.childProps.userHasAuthenticated(this.state.userid);
    this.setState({submitted: true});
  };

  createAccount = event => {
    event.preventDefault();
    // Firebase stuff

    // Go to dashboard/login
    this.props.childProps.userHasAuthenticated(this.state.userid);
    this.setState({submitted: true});
  }

  render() {
    return this.state.submitted ? <Redirect to="/dashboard" /> :
      <div>
        <div style={{display: this.state.show_overlay === true ? 'block' : 'none'}}>
        <div className="overlay"></div>
        <div className="modal">
          <p style={{lineHeight: "20px"}}>Create an Account</p>
          <form style={{lineHeight: "10px", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center", height: "60%"}}>
            <input
              type="text"
              value={this.state.userid}
              placeholder="Enter Account Number"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <input
              type="email"
              value={this.state.userid}
              placeholder="Enter Account Number"
              onChange={event => {
                this.handleChange(event);
              }}
            />
            <input
              type="text"
              value={this.state.userid}
              placeholder="Enter Account Number"
              onChange={event => {
                this.handleChange(event);
              }}
            />
          </form>
          <button style={{lineHeight: "10px"}}
            onClick={event => {
              this.createAccount(event);
            }}>
            Create Account
          </button>
        </div>
      </div>
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <input
            type="text"
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
          }}>
          Login
        </button>
        <div>
          <button
            onClick={event => {
              this.setState({show_overlay: true});
            }}>
          Create an Account
          </button>
        </div>
      </div>
      </div>;
  }
}

export default LoginForm;
