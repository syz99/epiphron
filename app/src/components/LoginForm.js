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
      okay: false
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
    this.setState({okay: true});
  };

  render() {
    return this.state.okay ? <Redirect to="/dashboard" /> :
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <form>
          <input
            type="text"
            value={this.state.userid}
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
      </div>;
  }
}

export default LoginForm;
