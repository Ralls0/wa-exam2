import React from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { CardMeme } from "../CardMeme/CardMeme";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: "#FFFFFF",
    margin: "7%",
    maxWidth: "90vw",
    minWidth: "60vw",
    maxHeight: "70vh",
    borderRadius: "25px",
    listStyle: "none",
    overflow: "hidden",
  },
}));

function MainContent(props) {
  
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="flex-start"
          spacing={4}
        >
          <Grid item className={classes.container}>
            <AnimateSharedLayout>
              <motion.div
                layout
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 1,
                  duration: 1,
                }}
              >
                {props.memes &&
                  props.memes.map((meme) => (
                    <CardMeme key={meme.id} meme={meme} />
                  ))}
              </motion.div>
            </AnimateSharedLayout>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { MainContent };
