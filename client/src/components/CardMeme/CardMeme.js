import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CallSplitSharpIcon from "@material-ui/icons/CallSplitSharp";
import { useStyles } from "./styles";
import { MemeImages } from "../../createContexts";

function CardMeme(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  const classes = useStyles();

  const imgs = useContext(MemeImages);

  useEffect(() => {
    if (imgs.length > 0) {
      let i = imgs.filter((image) => {
        return image.id === props.img;
      })[0].img;
      setImg(i);
    }
  }, [imgs, imgs.length, props.img]);

  const toggleOpen = () => setIsOpen((oldIsOpen) => !isOpen);

  return (
    <Card layout onClick={toggleOpen} className={classes.cardMemeContainer}>
      <CardContent>
        <InfoMeme
          title={props.meme.title}
          user={props.meme.user}
          private={props.meme.private}
          copy={props.meme.copy}
        />
        <AnimatePresence>
          {isOpen && (
            <Content
              img={img}
              font={props.meme.font}
              color={props.meme.color}
              text={{
                top: props.meme.texttop,
                center: props.meme.textcenter,
                bottom: props.meme.textbottom,
              }}
            />
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

function InfoMeme(props) {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="center" alignItems="flex-start">
      <Grid item>
        <Typography
          variant="h6"
          className={classes.textDarkPurple}
          gutterBottom
        >
          {props.title}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Typography
            variant="subtitle1"
            className={classes.textGreen}
            gutterBottom
          >
            By: {props.user}
          </Typography>
        </Grid>
        <Grid item>
          {props.private ? (
            <LockIcon color="error" />
          ) : (
            <LockOpenIcon color="secondary" />
          )}
        </Grid>
        <Grid item>
          {props.copy && <CallSplitSharpIcon className={classes.copy} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

function Content(props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MemeImg
        img={props.img}
        text={props.text}
        font={props.font}
        color={props.color}
      />
    </motion.div>
  );
}

function MemeImg(props) {
  const classes = useStyles({
    img: props.img,
    color: props.color,
    font: props.font,
  });
  return (
        <Grid container direction="column" justify="space-evenly" alignItems="center" spacing={10} className={classes.memeimg}>
          <Grid item>
          {props.text.top && (
              <Typography variant="h3" className={classes.text}>
                {props.text.top}
              </Typography>
          )}
          </Grid>
          <Grid item>
          {props.text.center && (
              <Typography variant="h3" className={classes.text}>
                {props.text.center}
              </Typography>
          )}
          </Grid>
          <Grid item>
          {props.text.bottom && (
              <Typography variant="h3" className={classes.text}>
                {props.text.bottom}
              </Typography>
          )}
          </Grid>
        </Grid>
  );
}

export { CardMeme, MemeImg };
