import React from 'react';
import firebase from "./firebase";

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      email: “”,
      fullname: “”
    };
  }

  addUser = e => {
    e.preventDefault();
    addUser = e => {
      e.preventDefault();
      this.setState({
        fullname: “”,
        email: “”
      });
    };
  };

  render() {
    return (
      <form>
        <input
          type="text"
          name="fullname"
          placeholder="Full name"
        />
        <input
          type="email"
          name="email"
          placeholder="Full name"
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default User;