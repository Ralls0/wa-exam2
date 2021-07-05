import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Avatar,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CallSplitSharpIcon from "@material-ui/icons/CallSplitSharp";
import DeleteIcon from "@material-ui/icons/Delete";
import WarningIcon from "@material-ui/icons/Warning";
import { MemeImg } from "../MemeImg/MemeImg";
import { MemeImages, UserInfoMode, LoggedInMode } from "../../createContexts";
import { useStyles } from "./styles";

const loaderVariants = {
  animationOne: {
    x: [-20, 20],
    y: [0, -30],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.5,
      },
      y: {
        yoyo: Infinity,
        duration: 0.25,
        ease: "easeOut",
      },
    },
  },
};

function CardMeme(props) {
  const [isOpen, setIsOpen] = useState(false);

  const classes = useStyles();

  const toggleOpen = () => setIsOpen((oldIsOpen) => !oldIsOpen);

  return (
    <motion.div
      whileHover={{
        scale: [1, 1, 0.95, 0.95, 0.95, 1, 1],
        rotate: [0, 0, 1, -1, 1, 0, 0],
      }}
    >
      <Card onClick={toggleOpen} className={classes.cardMemeContainer}>
        <CardContent>
          <InfoMeme
            img={props.img}
            meme={props.meme}
            deleteMeme={props.deleteMeme}
            copyMeme={props.copyMeme}
          />
          <AnimatePresence>
            {isOpen && <Content img={props.img} meme={props.meme} />}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function InfoMeme(props) {
  const { meme, deleteMeme, copyMeme, img } = props;

  const logged = useContext(LoggedInMode);
  const userInfo = useContext(UserInfoMode);
  const owner = userInfo.id === meme.userID;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    deleteMeme(meme.id);
  };
  const handleCopyClick = (event) => {
    event.stopPropagation();
    copyMeme();
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
          {meme.title}
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="flex-end" alignItems="center">
          {meme.status && (
            <Grid item>
              <Avatar alt={`Meme is ${meme.status}`}>
                <WarningIcon />
              </Avatar>
            </Grid>
          )}
          <Grid item>
            <IconButton
              disabled={!owner}
              className={classes.error}
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
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
            By: {meme.user}
          </Typography>
        </Grid>
        <Grid item>
          {meme.privat ? (
            <LockIcon color="error" />
          ) : (
            <LockOpenIcon color="secondary" />
          )}
        </Grid>
        <Grid item>
          {meme.copy === 1 && <CallSplitSharpIcon className={classes.copy} />}
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
          <IconButton
            disabled={!logged}
            color="primary"
            onClick={handleCopyClick}
          >
            <Link
              className={classes.link}
              to={{
                pathname: "/generator",
                state: {
                  img: img,
                  copy: 1,
                  diffUser: !owner,
                  meme: meme,
                },
              }}
            >
              <FileCopyIcon fontSize="inherit" />
            </Link>
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Content(props) {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(true);
  const imgs = useContext(MemeImages);

  useEffect(() => {
    if (imgs.length > 0) {
      let i = imgs.filter((image) => {
        return image.id === props.img;
      })[0];
      setImg(i);
      setLoading(false);
    }
  }, [imgs, props.img, props.meme.userID]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <MemeImg img={img} meme={props.meme} />
      )}
    </motion.div>
  );
}

function Loader() {
  const classes = useStyles();
  return (
    <motion.div
      className={classes.loader}
      variants={loaderVariants}
      animation="animationOne"
    ></motion.div>
  );
}

export { CardMeme };
