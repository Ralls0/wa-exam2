import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  NavLink,
  Link,
} from "react-router-dom";
import { LoggedInMode, UserInfoMode } from "../../createContexts";
import logo from "../../img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2C223F",
    minHeight: "100vh",
  },
  text: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
  },
  menu: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
    "&:active": {
      borderWidth: "0 0 2px 0",
      borderStyle: "solid",
      borderColor: "#C35CFF",
    },
  },
  link: {
    textDecoration: "none",
  },
  logo: {
    maxWidth: "150px",
    maxHeight: "150px",
  },
}));

export default function NavigationBar(props) {
  const loggedin = useContext(LoggedInMode);
  const userinfo = useContext(UserInfoMode);

  const classes = useStyles(); // FIXME : color

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item sx={6}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item sx={6}>
                  <img src={logo} alt="logo" className={classes.logo} />
                </Grid>
                <Router>
                  <Grid item sx={3}>
                    <NavLink
                      exact
                      to="/"
                      className={classes.link}
                    >
                      <Typography variant="h5" className={classes.menu}>
                        Home
                      </Typography>
                    </NavLink>
                  </Grid>
                  <Grid item sx={3}>
                    <NavLink
                      to="/generate"
                      className={classes.link}
                    >
                      <Typography variant="h5" className={classes.menu}>
                        Generate
                      </Typography>
                    </NavLink>
                  </Grid>
                </Router>
              </Grid>
            </Grid>
            <Grid item sx={6}>
              {loggedin ? (
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid item sx={6}>
                    <Typography variant="h5" className={classes.text}>
                      Welcome {userinfo.name}!
                    </Typography>
                  </Grid>
                  <Grid item sx={6}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={props.doLogOut}
                    >
                      Logout
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Link to="/login" className={classes.link}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={props.doLogIn}
                  >
                    Login
                  </Button>
                </Link>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
