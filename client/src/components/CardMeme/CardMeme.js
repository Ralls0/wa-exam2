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
    <Grid container direction="column" justify="center" alignitems="flex-start">
      <Grid item>
        <Typography variant="h6" className={classes.textDarkPurple}>
          {props.title}
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignitems="flex-start"
        spacing={2}
      >
        <Grid item>
          <Typography variant="subtitle1" className={classes.textGreen}>
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
  });

  let cnt = 0;
  let txtg = [];
  let tmp = [];
  tmp.push(props.img.tl);
  tmp.push(props.img.tc);
  tmp.push(props.img.tr);
  txtg.push(tmp);
  tmp = [];
  tmp.push(props.img.ml);
  tmp.push(props.img.mc);
  tmp.push(props.img.mr);
  txtg.push(tmp);
  tmp = [];
  tmp.push(props.img.bl);
  tmp.push(props.img.bc);
  tmp.push(props.img.br);
  txtg.push(tmp);
  tmp = 0;

  for (let r of [0, 1, 2]) {
    for (let c of [0, 1, 2]) {
      if (txtg[r][c] === 1) {
        txtg[r][c] = props.text[cnt++];
      } else {
        txtg[r][c] = "";
      }
    }
  }
  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignitems="center"
      spacing={10}
      className={classes.memeimg}
    >
      {txtg.map((r) => (
        <Grid key={tmp} item>
          <RowTypography
            key={tmp++}
            texts={r}
            img={props.img}
            color={props.color}
            font={props.font}
            size={props.size}
          />
        </Grid>
        ))}
    </Grid>
  );
}

function RowTypography(props) {
  let cnt = 0;
  return (
    <Grid container direction="row" justify="space-between" alignitems="center">
      {props.texts.map((text) => (
          <>
            <ColumnTypography
              key={cnt++}
              text={text}
              img={props.img}
              color={props.color}
              font={props.font}
              size={props.size}
            />
          </>
        ))}
    </Grid>
  );
}
function ColumnTypography(props) {
  const classes = useStyles({
    img: props.img.img,
    color: props.color,
    font: props.font,
    size: props.size,
  });
  return (
    <Grid item lg={3}>
      <Typography className={classes.textRight}>{props.text}</Typography>
    </Grid>
  );
}

export { CardMeme, MemeImg };
