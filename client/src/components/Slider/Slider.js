import * as React from "react";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Grid from "@material-ui/core/Grid";
import { motion, AnimatePresence } from "framer-motion";
import { useStyles } from "./styles";

function Slider(props) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgNextIndex, setNextIndex] = useState(1);
  const [imgBeforeIndex, setBeforeIndex] = useState(props.images.length - 1);

  const classes = useStyles();

  const paginate = (newDirection) => {
    props.handleImg(
      props.images[
        imgIndex + newDirection < 0
          ? props.images.length - 1
          : (imgIndex + newDirection) % props.images.length
      ]
    );
    setImgIndex((oldImg) => {
      return oldImg + newDirection < 0
        ? props.images.length - 1
        : (oldImg + newDirection) % props.images.length;
    });
    setNextIndex((oldImg) => {
      return oldImg + newDirection < 0
        ? props.images.length - 1
        : (oldImg + newDirection) % props.images.length;
    });
    setBeforeIndex((oldImg) => {
      return oldImg + newDirection < 0
        ? props.images.length - 1
        : (oldImg + newDirection) % props.images.length;
    });
  };

  console.log("Slider");

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <IconButton
          color="secondary"
          aria-label="left arrow"
          component="span"
          onClick={() => paginate(-1)}
        >
          <ArrowLeftIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <AnimatePresence>
          <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
            <Grid item>
              <motion.img
                className={classes.imgSide}
                key={imgBeforeIndex}
                src={props.images[imgBeforeIndex].img}
                initial={{
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 3 },
                  delay: 0.5,
                  duration: 2,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
              />
            </Grid>
            <Grid item>
              <motion.img
                className={classes.img}
                key={imgIndex}
                src={props.images[imgIndex].img}
                initial={{
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 3 },
                  delay: 0.5,
                  duration: 2,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
              />
            </Grid>
            <Grid item>
              <motion.img
                className={classes.imgSide}
                key={imgNextIndex}
                src={props.images[imgNextIndex].img}
                initial={{
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{
                  opacity: { duration: 3 },
                  delay: 0.5,
                  duration: 2,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
              />
            </Grid>
          </Grid>
        </AnimatePresence>
      </Grid>
      <Grid item>
        <IconButton
          color="secondary"
          aria-label="right arrow"
          component="span"
          onClick={() => paginate(1)}
        >
          <ArrowRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export { Slider };
