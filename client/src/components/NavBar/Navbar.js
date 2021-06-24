import React from "react";
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
  Link,
} from "react-router-dom";
import logo from "../../img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2C223F",
    minHeight: "100vh",
  },
  menu: {
    fontFamily: "Impact",
    textDecoration: 'none',
    flexGrow: 1,
    color: "#98CC6D",
    "&:active": {
      borderWidth: "0 0 2px 0",
      borderStyle: "solid",
      borderColor: "#C35CFF",
    },
  },
  activeMenu: {
    flexGrow: 1,
    color: "#98CC6D",
    borderWidth: "0 0 2px 0",
    borderStyle: "solid",
    borderColor: "#C35CFF",
  },
  logo: {
    maxWidth: "150px",
    maxHeight: "150px",
  },
}));

export default function NavigationBar() {
  const classes = useStyles();

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
            <Grid item sx={4}>
              <img src={logo} alt="logo" className={classes.logo} />
            </Grid>
            <Grid item sx={4}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
              >
                <Router>
                  <Grid item sx={6}>
                    <Link to="/" className={classes.activeMenu}>
                      <Typography variant="h5">
                        Home
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item sx={6}>
                    <Link to="/generate" className={classes.menu}>
                      <Typography variant="h5">
                        Generate
                      </Typography>
                    </Link>
                  </Grid>
                </Router>
              </Grid>
            </Grid>
            <Grid item sx={4}>
              <Button color="inherit">Login</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
