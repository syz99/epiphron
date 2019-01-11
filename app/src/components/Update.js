import React, { Component } from "react";
import "../css/index.css";
import { Redirect } from "react-router-dom";
import firebase from "./Firestore"; // auth stuff
import Icon from "material-ui/core/Icon";

class Update extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      monthly_payment: "",
      parent_id: "",
      student_id: "",
      threshold: "",
      shane: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const db = firebase.firestore(); // initialize db
    db.settings({
      timestampsInSnapshots: true
    });
    var test = db
      .collection("pairings")
      .where("parent_id", "==", this.state.parent_id)
      .get()
      .then(snapshot => {
        var found = false;
        snapshot.forEach(parent => {
          found = true;
          this.props.childProps.userHasAuthenticated(this.state.userid);
          this.setState({ isParent: true });
          this.props.childProps.checkParent(this.state.isParent);
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
                this.props.childProps.checkParent(this.state.isParent);
                this.setState({ submitted: true });
              });
              if (!found) {
                alert("Invalid Parent ID, come on!");
              }
            })
            .catch(err => alert("Internal Server Error: Wait and retry"));
        }
      })
      .catch(err => alert("Internal Server Error: Wait and retry"));
  };

  update = event => {
    event.preventDefault();

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
    this.props.childProps.checkParent(this.state.isParent);
    this.setState({ submitted: true });
  };

  render() {}
}

export default Update;
