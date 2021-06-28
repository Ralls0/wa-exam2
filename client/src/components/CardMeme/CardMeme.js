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
      })[0];
      setImg(i);
    }
  }, [imgs, imgs.length, props.img]);

  const toggleOpen = () => setIsOpen((oldIsOpen) => !oldIsOpen);

  return (
    <Card onClick={toggleOpen} className={classes.cardMemeContainer}>
      <CardContent>
        <InfoMeme
          title={props.meme.title}
          user={props.meme.user}
          private={props.meme.privat}
          copy={props.meme.copy}
        />
        <AnimatePresence>
          {isOpen && (
            <Content
              img={img}
              font={props.meme.font}
              size={props.meme.size}
              color={props.meme.color}
              text={[props.meme.text1, props.meme.text2, props.meme.text3]}
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
          {props.copy === 1 && <CallSplitSharpIcon className={classes.copy} />}
        </Grid>
      </Grid>
    </Grid>
  );
}

function Content(props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <MemeImg
        img={props.img}
        text={props.text}
        font={props.font}
        size={props.size}
        color={props.color}
      />
    </motion.div>
  );
}

function MemeImg(props) {
  const classes = useStyles({
    img: props.img.img,
    color: props.color,
    font: props.font,
    size: props.size,
  });
  let cnt = 0;
  let txtg = [];
  txtg.push(props.img.tl);
  txtg.push(props.img.tc);
  txtg.push(props.img.tr);
  txtg.push(props.img.ml);
  txtg.push(props.img.mc);
  txtg.push(props.img.mr);
  txtg.push(props.img.bl);
  txtg.push(props.img.bc);
  txtg.push(props.img.br);

  for (let e of txtg) {
    if (e === 1) txtg[txtg.indexOf(e)] = props.text[cnt++];
  }

  return (
    <Grid
      container
      direction="column"
      justify="space-evenly"
      alignItems="center"
      spacing={10}
      className={classes.memeimg}
    >
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            {txtg[0] !== 0 && (
              <Typography className={classes.text}>{txtg[0]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[1] !== 0 && (
              <Typography className={classes.text}>{txtg[1]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[2] !== 0 && (
              <Typography className={classes.text}>
                {txtg[2]}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            {txtg[3] !== 0 && (
              <Typography className={classes.text}>{txtg[3]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[4] !== 0 && (
              <Typography className={classes.text}>{txtg[4]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[5] !== 0 && (
              <Typography className={classes.text}>
                {txtg[5]}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item>
            {txtg[6] !== 0 && (
              <Typography className={classes.text}>{txtg[6]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[7] !== 0 && (
              <Typography className={classes.text}>{txtg[7]}</Typography>
            )}
          </Grid>
          <Grid item>
            {txtg[8] !== 0 && (
              <Typography className={classes.text}>
                {txtg[8]}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { CardMeme, MemeImg };
