import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LoggedInMode, UserInfoMode } from "../../createContexts";
import { Menu } from "./menu/Menu";
import logo from "../../img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#2C223F",
    boxShadow: "none",
  },
  text: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
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
            <Grid item>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                spacing={3}
              >
                <Grid item>
                  <motion.div
                    initial={{ x: "-100vw" }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 50 }}
                  >
                    <img src={logo} alt="logo" className={classes.logo} />
                  </motion.div>
                </Grid>
                <Menu menu={props.menu} handleMenu={props.handleMenu} />
              </Grid>
            </Grid>
            <Grid item>
              <motion.div
                initial={{ x: "100vw" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 50 }}
              >
                {loggedin ? (
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    spacing={3}
                  >
                    <Grid item>
                      <Typography variant="h5" className={classes.text}>
                        Welcome {userinfo.name}!
                      </Typography>
                    </Grid>
                    <Grid item>
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
                  <Router>
                    <Link to="/login" className={classes.link}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => props.handleMenu("/login")}
                      >
                        Login
                      </Button>
                    </Link>
                  </Router>
                )}
              </motion.div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
