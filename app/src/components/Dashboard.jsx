import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
// import styled from "styled-components";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 31, // 18
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

function Dashboard(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24}>
        <Grid item xl>
          <Paper className={classes.paper} id="allowance">
            <div>$ Allowance</div>
            <input type="text" name="name" />
            <Fab color="secondary" aria-label="Edit" className={classes.fab}>
              {/* <Icon>edit_icon</Icon> */}
            </Fab>
            <div>Two</div>
          </Paper>
        </Grid>
        <Grid item xl>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
