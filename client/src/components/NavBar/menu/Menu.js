import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const useStyles = makeStyles((theme) => ({
  menu: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
    "&:active": {
      borderWidth: "0 0 3px 0",
      borderStyle: "solid",
      borderColor: "#C35CFF",
    },
  },
  active: {
    fontFamily: "Impact",
    textDecoration: "none",
    flexGrow: 1,
    color: "#98CC6D",
    borderWidth: "0 0 3px 0",
    borderStyle: "solid",
    borderColor: "#C35CFF",
  },
  link: {
    textDecoration: "none",
  },
}));

function Menu(props) {
  const classes = useStyles();

  return (
    <motion.div
    initial={{y: -250}}
    animate={{y: 0}}
    transition={{delay: 0.2, type: 'spring', stiffness: 50}}
    >
      <Router>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <NavLink exact to="/" onClick={() => props.handleMenu('/')} className={classes.link}>
              <Typography variant="h5" className={props.menu==='/'?classes.active:classes.menu}>
                Home
              </Typography>
            </NavLink>
          </Grid>
          <Grid item>
            <NavLink to="/generate" onClick={() => props.handleMenu('/generate')} className={classes.link}>
              <Typography variant="h5" className={props.menu==='/generate'?classes.active:classes.menu}>
                Generator
              </Typography>
            </NavLink>
          </Grid>
        </Grid>
      </Router>
    </motion.div>
  );
}

export { Menu };
