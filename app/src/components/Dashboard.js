import React, { Component } from "react";
import "../css/index.css";
import logo from "../img/logo2.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  CustomBarLabel
} from "recharts";
import firebase from "./Firestore";

// Start of nessie code
function compareDates(a, b) {
  var d1 = Date.parse(a.purchase_date);
  var d2 = Date.parse(b.purchase_date);
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

function getSum(total, num) {
  return total + num;
}

function mapAsync(item) {
  return new Promise(function(resolve, reject) {
    getMerchant(item.merchant_id)
      .then(merchantName => {
        resolve({
          amount: item.amount,
          name: item.purchase_date,
          merchant: merchantName
        });
      })
      .catch(err => {
        reject(Error("mapAsync failed"));
      });
  });
}
// End nessie

class Dashboard extends Component {
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      graphReady: false,
      shane: 0,
      allowance: 0,
      threshold: 0,
      studentId: "",
      firebaseKey: ""
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value);
  };

  updateAllowance = event => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var data = {
      monthly_payment: this.state.allowance,
      parent_id: this.props.childProps.id,
      student_id: this.state.studentId,
      threshold: this.state.threshold
    }
    return db.collection('pairings').doc(this.state.firebaseKey).set(data).then(() => {
      return true;
    }).catch(error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    });
  }

  updateThreshold = event => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var data = {
      monthly_payment: this.state.allowance,
      parent_id: this.props.childProps.id,
      student_id: this.state.studentId,
      threshold: this.state.threshold
    }
    return db.collection('pairings').doc(this.state.firebaseKey).set(data).then(() => {
      var tempData = this.state.data;
      var total = this.state.threshold;
      var thresholdDif = this.state.threshold - tempData[0].amount;
      tempData[0].amount = parseInt(tempData[0].amount, 10);
      console.log(thresholdDif);
      for (var i = 0; i < tempData.length; i++) {
        tempData[i].amount += thresholdDif;
      }
      this.setState({data: tempData});
      console.log(tempData);
      return true;
    }).catch(error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    });
  }

  componentDidMount() {
    // Getting LHS
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    var test = db
      .collection("pairings")
      .where("parent_id", "==", this.props.childProps.id)
      .get()
      .then(snapshot => {
        snapshot.forEach(parent => {
          console.log(parent);
          var object = parent._document.proto.fields;
          this.setState({allowance: object.monthly_payment.stringValue});
          this.setState({threshold: object.threshold.stringValue});
          this.setState({studentId: object.student_id.stringValue});
          this.setState({firebaseKey: parent.id})

          // For graph
          var prefix = "http://api.reimaginebanking.com/accounts/";
          var suffix = "/purchases?key=50c1162906a20143626fd3352573573c";
          var preliminaryRes = prefix.concat(this.state.studentId); // Replace with id
          var res = preliminaryRes.concat(suffix);
          fetch(res)
          .then(results => {
            return results.json()
          }).then(data => {
            var today = new Date();
            var mm = (today.getMonth() + 1).toString();
            if (mm.length < 2) {
              mm = "0".concat(mm);
            }
            var yyyy = today.getFullYear().toString();
            var dateMatch = yyyy.concat("-");
            dateMatch = dateMatch.concat(mm);
            return data.filter(x => x.purchase_date.startsWith(dateMatch));
          }).then(data2 => {
            data2.sort(compareDates);
            return data2
          }).then(data3 => {
            return Promise.all(data3.map(mapAsync))
              .then(data => {
                this.setState({shane: data.map(x => x.amount).reduce(getSum)});
                var total = this.state.threshold;
                for (var i = 0; i < data.length; i++) {
                  var curAmount = data[i].amount
                  data[i].amount = total;
                  total -= curAmount;
                }
                this.setState({data: data});
                this.setState({graphRead: true});

              })
          })
        });
    })
    .catch(err => alert("Internal Server Error: Wait and reload"));
  }

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
            <h1 className="font" style={{textAlign: "center"}}>
              Monthly Allowance
            </h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <input type="text"
                name="allowance"
                value={this.state.allowance}
                onChange={event => {
                  this.handleChange(event);
                }}/>
              <button
                style={{ lineHeight: "10px" }}
                onClick={event => {
                  this.updateAllowance(event);
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
            <h1 style={{textAlign: "center"}}>Threshold</h1>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <input type="text"
                name="threshold"
                value={this.state.threshold}
                onChange={event => {
                  this.handleChange(event);
                }}/>
              <button
                style={{ lineHeight: "10px" }}
                onClick={event => {
                  this.updateThreshold(event);
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
            <h1 style={{textAlign: "center"}}>Total Spendings</h1>
            <h1 style={{textAlign: "center"}}>${this.state.shane}</h1>
          </div>
        </div>
        <div className="column" style={{ flexGrow: "3", display: "flex" }}>
          {this.state.graphReady ? (
            <img
              src="https://thumbs.gfycat.com/RadiantCheerfulBigmouthbass-max-1mb.gif"
              style={{ display: "inherit", margin: "auto" }}
            />
          ) : (
            <div>
              <h1>Child's Monthly Spending</h1>
              <LineChart
                width={1200}
                height={770}
                data={this.state.data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
