import React, { Component } from "react";
import "../css/index.css";
import logo from "../img/logo.svg";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, CustomBarLabel } from 'recharts';

// Start of nessie code
function compareDates(a,b) {
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
        return results.json()
      }).then(data => {
        resolve(data.name);
      }).catch(err => {reject(Error("getMerchant failed"))});
  });
};

function getSum(total, num) {
  return total + num;
};

function mapAsync(item) {
  return new Promise(function(resolve, reject) {
    getMerchant(item.merchant_id)
      .then(merchantName => {
        resolve({amount: item.amount, name: item.purchase_date, merchant: merchantName})
      }).catch(err => {reject(Error("mapAsync failed"))});
  });
};
// End nessie

class Dashboard extends Component {
	constructor(props) {
    super(props);

    this.state = {
      data: [],
      graphReady: false,
      shane: 0
    };
  }

  componentDidMount() {
    var prefix = "http://api.reimaginebanking.com/accounts/";
    var suffix = "/purchases?key=50c1162906a20143626fd3352573573c";
    var preliminaryRes = prefix.concat("5c3807b4b8e2a665da3eb603"); // Replace with id
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
  }

  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100%", position: "relative", color: "white"}}>
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
        <div className="column" style={{flexGrow: "3", display: "flex"}}>
        {this.state.graphReady ? <img src="https://thumbs.gfycat.com/RadiantCheerfulBigmouthbass-max-1mb.gif" style={{display: "inherit", margin: "auto"}}/>:
          <div>
          <h1>Child's Monthly Spending</h1>
          <LineChart width={1200} height={770} data={this.state.data}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{r: 8}}/>
          </LineChart>
          </div>
        }
         </div>
      </div>
    );
  }
}

export default Dashboard;
