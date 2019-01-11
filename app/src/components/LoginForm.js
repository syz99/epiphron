import React, { Component } from "react";
import logo from "../img/logo.svg";
import "../css/index.css";
import { Redirect } from "react-router-dom";
import firebase from "./Firestore";

// Start of nessie code
function compareDates(a, b) {
  var d1 = Date.parse("2012-11-01");
  var d2 = Date.parse("2012-11-04");
  if (d1 < d2) {
    return -1;
  }
  return 1;
}

function getMerchant(merchantId) {
  var prefix = "http://api.reimaginebanking.com/enterprise/merchants/";
  var suffix = "?key=50c1162906a20143626fd3352573573c";
  var preliminaryRes = prefix.concat(merchantId);
  var res = preliminaryRes.concat(suffix);
  return new Promise(function(resolve, reject) {
    fetch(res)
      .then(results => {
        return results.json();
      })
      .then(data => {
        resolve(data.name);
      })
      .catch(err => {
        reject(Error("getMerchant failed"));
      });
  });
}
// End nessie

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
      this.props.childProps.checkParent(this.state.isParent);
      this.setState({ submitted: true });
    }
  };

  openOverlay = event => {
    getMerchant("57cf75cea73e494d8675ec49").then(data => console.log(data));
    var prefix = "http://api.reimaginebanking.com/accounts/";
    var suffix = "/purchases?key=50c1162906a20143626fd3352573573c";
    var preliminaryRes = prefix.concat("5c3807b4b8e2a665da3eb603"); // Replace with id
    var res = preliminaryRes.concat(suffix);
    fetch(res)
      .then(results => {
        return results.json();
      })
      .then(data => {
        var today = new Date();
        var mm = (today.getMonth() + 1).toString();
        if (mm.length < 2) {
          mm = "0".concat(mm);
        }
        var yyyy = today.getFullYear().toString();
        var dateMatch = yyyy.concat("-");
        dateMatch = dateMatch.concat(mm);
        return data.filter(x => x.purchase_date.startsWith(dateMatch));
      })
      .then(data2 => {
        data2.sort(compareDates);
        return data2;
      })
      .then(data3 => {
        console.log(data3.length);
        return Promise.all(data3).then(data => {
          var dict = [];
          return data.map(x => {
            var dict = [];
            dict.push({
              amount: x.amount,
              purchase_date: x.purchase_date,
              merchant: getMerchant(x.merchant_id)
            });
            return dict;
          });
        });
      });
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
        <div style={{ marginTop: 60 + "px" }}>
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <br />
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
            class="button"
            onClick={event => {
              this.handleSubmit(event);
            }}
          >
            Login
          </button>
          <div>
            <button
              class="button"
              onClick={event => {
                this.openOverlay(event);
              }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
