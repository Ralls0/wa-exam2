import * as React from "react";
import { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import Grid from "@material-ui/core/Grid";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useStyles } from "./styles";

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function Slider(props) {
  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, props.images.length, page);

  const classes = useStyles();

  const paginate = (newDirection) => {
    props.handleImg(props.images[imageIndex]);
    setPage((page) => [page[0] + newDirection, newDirection]);
  };

  console.log("Slider")

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid item>
        <IconButton
          color="secondary"
          aria-label="left arrow"
          component="span"
          onClick={() => paginate(1)}
        >
          <ArrowLeftIcon />
        </IconButton>
      </Grid>
      <Grid item>
        <AnimatePresence initial={false} custom={direction}>
          <motion.img
            className={classes.img}
            key={page}
            src={props.images[imageIndex].img}
            custom={direction}
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
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          />
        </AnimatePresence>
      </Grid>
      <Grid item>
        <IconButton
          color="secondary"
          aria-label="right arrow"
          component="span"
          onClick={() => paginate(-1)}
        >
          <ArrowRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export { Slider };
