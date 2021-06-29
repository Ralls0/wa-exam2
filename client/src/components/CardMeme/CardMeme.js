import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CallSplitSharpIcon from "@material-ui/icons/CallSplitSharp";
import DeleteIcon from "@material-ui/icons/Delete";
import { MemeImg } from "../MemeImg/MemeImg";
import { useStyles } from "./styles";
import { MemeImages, UserInfoMode, LoggedInMode } from "../../createContexts";

function CardMeme(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");
  const [owner, setOwner] = useState(false);

  const classes = useStyles();

  const imgs = useContext(MemeImages);
  const userInfo = useContext(UserInfoMode);
  const logged = useContext(LoggedInMode);

  useEffect(() => {
    if (imgs.length > 0) {
      let i = imgs.filter((image) => {
        return image.id === props.img;
      })[0];
      setImg(i);
    }
    setOwner(userInfo.id === props.meme.userID);
  }, [imgs, imgs.length, props.img, userInfo, props.meme]);

  const toggleOpen = () => setIsOpen((oldIsOpen) => !oldIsOpen);

  return (
    <Card onClick={toggleOpen} className={classes.cardMemeContainer}>
      <CardContent>
        <InfoMeme meme={props.meme} owner={owner} logged={logged} deleteMeme={props.deleteMeme}/>
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
  const handleDeleteClick = (event) => {
    event.stopPropagation();
    props.deleteMeme(props.meme.id)
  };
  const handleCopyClick = (event) => {
    event.stopPropagation();
  };
  const classes = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignitems="flex-start"
    >
      <Grid item>
        <Typography variant="h6" className={classes.textDarkPurple}>
          {props.meme.title}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton
          disabled={!props.owner}
          className={classes.error}
          onClick={handleDeleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignitems="center"
        spacing={2}
      >
        <Grid item>
          <Typography variant="subtitle1" className={classes.textGreen}>
            By: {props.meme.user}
          </Typography>
        </Grid>
        <Grid item>
          {props.meme.privat ? (
            <LockIcon color="error" />
          ) : (
            <LockOpenIcon color="secondary" />
          )}
        </Grid>
        <Grid item>
          {props.meme.copy === 1 && (
            <CallSplitSharpIcon className={classes.copy} />
          )}
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item>
        <IconButton disabled={!props.logged} color="primary" onClick={handleCopyClick}>
            <FileCopyIcon fontSize="inherit" />
        </IconButton>
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

export { CardMeme, MemeImg };
