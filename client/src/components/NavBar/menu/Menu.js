import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useStyles } from "./styles";

function Menu(props) {
  const classes = useStyles();

  return (
    <motion.div
    initial={{y: -250}}
    animate={{y: 0}}
    transition={{delay: 0.2, type: 'spring', stiffness: 50}}
    >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <Link to="/" onClick={() => props.handleMenu('/')} className={classes.link}>
              <Typography variant="h5" className={props.menu==='/'?classes.active:classes.menu}>
                Home
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link to="/generator" onClick={() => props.handleMenu('/generator')} className={classes.link}>
              <Typography variant="h5" className={props.menu==='/generator'?classes.active:classes.menu}>
                Generator
              </Typography>
            </Link>
          </Grid>
        </Grid>
    </motion.div>
  );
}

export { Menu };
