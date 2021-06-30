import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { ColorFont } from "./ColorFont";
import { ErrorAlert } from "./ErrorAlert";
import { Permission } from "./Permission";
import { Texts } from "./Texts";
import { Title } from "./Title";
import { SubmitButton } from "./SubmitButton";
import { useStyles } from "./styles";

function FormGenerator(props) {
  const {
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
  } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [privat, setPrivat] = useState(privatBlock || "public");
  const [textFields, setTextFields] = useState(1);

  const classes = useStyles();

  useEffect(() => {
    let cnt = 0;
    cnt +=
      imgs.tl +
      imgs.tc +
      imgs.tr +
      imgs.ml +
      imgs.mc +
      imgs.mr +
      imgs.bl +
      imgs.bc +
      imgs.br;
    setTextFields(cnt);
    handleText("", "text1");
    handleText("", "text2");
    handleText("", "text3");
  }, [imgs]);

  const handlePrivat = (event) => {
    setPrivat(event.target.value);
  };

  const handleOpen = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    if (color === "" || title === "") {
      valid = false;
    }

    if (valid) {
    } else {
      setErrorMessage("Error(s) in the form, please fix it.");
    }
  };
  return (
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
        {(privatBlock !== "private") ? (
          <Permission privat={privat} handlePrivat={handlePrivat} />
        ) : (
          <></>
        )}
      </Grid>
      <Grid item>
        <Texts textFields={textFields} text={text} handleText={handleText} />
      </Grid>
      <Grid item>
        <SubmitButton handleSubmit={handleSubmit} />
      </Grid>
    </Grid>
  );
}

export { FormGenerator };
