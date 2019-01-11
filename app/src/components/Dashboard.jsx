import React, { Component } from "react";
import "../css/index.css";

class Dashboard extends Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "row", height: "100%", position: "relative", color: "white"}}>
        <div className="column" style={{flexGrow: "1"}}>Monthly Limit</div>
        <div className="column" style={{flexGrow: "3"}}>One Third</div>
      </div>
    );
  }
}

export default Dashboard;

// import React from "react";
// import { withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import PropTypes from "prop-types";
// import Fab from "@material-ui/core/Fab";
// import Icon from "@material-ui/core/Icon";
// import "../img/edit.svg";
// import graph from "../img/graph.png";

// // import styled from "styled-components";

// const styles = theme => ({
//   root: {
//     flexGrow: 1,
//     margin: 30
//   },
//   paper: {
//     padding: theme.spacing.unit * 17, // 18
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//     height: 100
//   }
// });

// function Dashboard(props) {
//   const { classes } = props;

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={24}>
//         <Grid item xl>
//           <Paper className={classes.paper}>
//             <div>Monthly Limit</div>
//             <input type="text" name="name" />
//             <Fab color="secondary" aria-label="Edit" className={classes.fab}>
//               <Icon>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                   <path d="M0 0h24v24H0z" fill="none" />
//                 </svg>
//               </Icon>
//             </Fab>
//             <div>Threshold</div>
//             <Fab color="secondary" aria-label="Edit" className={classes.fab}>
//               <Icon size="small">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                   <path d="M0 0h24v24H0z" fill="none" />
//                 </svg>
//               </Icon>
//             </Fab>
//           </Paper>
//         </Grid>
//         <Grid item xl>
//           <Paper className={classes.paper}>
//             <img src={graph} className="App-logo" alt="logo" />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Dashboard);
