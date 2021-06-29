import React from "react";
import Grid from "@material-ui/core/Grid";
import { motion, AnimateSharedLayout } from "framer-motion";
import { CardMeme } from "../CardMeme/CardMeme";
import { useStyles } from "./styles";

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
                initial={{ opacity: 0, x: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.2,
                }}
              >
                {props.memes &&
                  props.memes.map((meme) => (
                    <CardMeme key={meme.id} meme={meme} img={meme.img} deleteMeme={props.deleteMeme}/>
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
