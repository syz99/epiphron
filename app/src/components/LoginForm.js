import React, { Component } from "react";
import "../css/index.css";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userid: ""
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
  };

  render() {
    return (
      <div>
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
          }}
        >
          Login
        </button>
      </div>
    );
  }
}

export default LoginForm;
