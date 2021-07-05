import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { ColorFont } from "./ColorFont";
import { ErrorAlert } from "./ErrorAlert";
import { Permission } from "./Permission";
import { Texts } from "./Texts";
import { Title } from "./Title";
import { SubmitButton } from "./SubmitButton";
import { UserInfoMode } from "../../../createContexts";
import { useStyles } from "./styles";

function FormGenerator(props) {
  const {
    img,
    imgs,
    color,
    font,
    fonts,
    text,
    title,
    handleTitle,
    handleColor,
    handleText,
    handleFont,
    privatBlock,
    copy,
    addMeme,
  } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [privat, setPrivat] = useState(privatBlock);
  const [textFields, setTextFields] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const userInfo = useContext(UserInfoMode);
  const classes = useStyles();

  useEffect(() => {
    let cnt = 0;
    cnt +=
      img.tl +
      img.tc +
      img.tr +
      img.ml +
      img.mc +
      img.mr +
      img.bl +
      img.bc +
      img.br;
    setTextFields(cnt);
    if (!copy) {
    handleText("", "text1");
    handleText("", "text2");
    handleText("", "text3");
    }
  }, [img, copy]);

  const handlePrivat = (event) => {
    setPrivat(event.target.value);
  };

  const handleOpen = () => {
    setOpen(false);
  };

  const getListId = (items) => {
    let listId = [];
    if (Array.isArray(items)) {
      items.forEach((item) => listId.push(item.id));
    }
    return listId;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const text1 = text.text1 || null
    const text2 = text.text2 || null
    const text3 = text.text3 || null
    const priv = privat === "public" ? 0 : 1
    const newMeme = {
      title: title,
      text1: text1,
      text2: text2,
      text3: text3,
      img: img.id,
      privat: priv,
      userID: userInfo.id,
      user: userInfo.name,
      copy: copy,
      fontID: font.id,
      font: font.font,
      size: font.size,
      color: color,
    };

    let valid = true;
    if (title === "") {
      valid = false;
    }
    if (!text1 && !text2 && !text3) {
      valid = false;
    }
    if (!getListId(imgs).includes(img.id)) {
      valid = false;
    }
    if (!userInfo.id) {
      valid = false;
    }
    if (copy !== 0 && copy !== 1) {
      valid = false;
    }
    if (!getListId(fonts).includes(font.id)) {
      valid = false;
    }
    if (color === "" || color.length !== 7) {
      valid = false;
    }

    if (valid) {
      addMeme(newMeme);
      setSubmitted(true);
    } else {
      setErrorMessage("Error(s) in the form, please fix it.");
    }
  };
  return (
    <>
      {" "}
      {submitted ? (
        <Redirect to="/" />
      ) : (
        <Grid
          container
          direction="column"
          justify="space-evenly"
          alignItems="center"
          spacing={4}
          className={classes.container}
        >
          <Grid item>
            <ErrorAlert
              open={open}
              handleOpen={handleOpen}
              errorMessage={errorMessage}
            />
          </Grid>
          <Grid item>
            <Title title={title} handleTitle={handleTitle} />
          </Grid>
          <Grid item>
            <ColorFont
              color={color}
              handleColor={handleColor}
              font={font}
              handleFont={handleFont}
              fonts={fonts}
            />
          </Grid>
          <Grid item>
            {privatBlock !== "private" ? (
              <Permission privat={privat} handlePrivat={handlePrivat} />
            ) : (
              <></>
            )}
          </Grid>
          <Grid item>
            <Texts
              textFields={textFields}
              text={text}
              handleText={handleText}
            />
          </Grid>
          <Grid item>
            <SubmitButton handleSubmit={handleSubmit} />
          </Grid>
        </Grid>
      )}
    </>
  );
}

export { FormGenerator };
