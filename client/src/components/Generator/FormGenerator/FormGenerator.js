import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import SendIcon from "@material-ui/icons/Send";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { motion } from "framer-motion";
import { useStyles, useOutlinedInputStyles } from "./styles";

function FormGenerator(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(true);
  const [privat, setPrivat] = useState(props.proivat || "public");
  const [textFields, setTextFields] = useState(1);

  useEffect(() => {
    let cnt = 0;
    cnt += props.images.tl;
    cnt += props.images.tc;
    cnt += props.images.tr;
    cnt += props.images.ml;
    cnt += props.images.mc;
    cnt += props.images.mr;
    cnt += props.images.bl;
    cnt += props.images.bc;
    cnt += props.images.br;
    setTextFields(cnt);
    props.handleText("", "text1");
    props.handleText("", "text2");
    props.handleText("", "text3");
  }, [props.images]);

  const handleChange = (event) => {
    setPrivat(event.target.value);
  };

  const classes = useStyles();
  const outlinedInputClasses = useOutlinedInputStyles();

  const handleSubmit = (event) => {
    event.preventDefault();

    let valid = true;
    if (props.color === "" || props.title === "") {
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
      justify="center"
      alignItems="center"
      spacing={5}
      className={classes.container}
    >
      <Grid item>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            {errorMessage ? (
              <Collapse in={open}>
                <Alert
                  error
                  variant="outlined"
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {errorMessage}
                </Alert>
              </Collapse>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 50,
            duration: 1,
          }}
        >
          <Grid container justify="center" alignItems="stretch" spacing={6}>
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel htmlFor="email">Title</InputLabel>
                <OutlinedInput
                  fullWidth={true}
                  id="text"
                  type="text"
                  value={props.title}
                  onChange={(e) => props.handleTitle(e.target.value)}
                  secondary
                  classes={outlinedInputClasses}
                  labelWidth={100}
                />
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={3}
        >
          <Grid item>
            <input
              id="color"
              type="color"
              value={props.color}
              onChange={(e) => props.handleColor(e.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor="demo-customized-select-native">
                Font
              </InputLabel>
              <NativeSelect
                id="fonts"
                value={props.font.font}
                onChange={(event) => {
                  props.handleFont(
                    props.fonts.filter((f) => {
                      return f.font === event.target.value;
                    })[0]
                  );
                }}
              >
                {props.fonts.map((font) => {
                  return (
                    <option key={font.id} value={font.font}>
                      {font.font}
                    </option>
                  );
                })}
              </NativeSelect>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <FormControl component="fieldset">
          <FormLabel component="legend">Permission</FormLabel>
          <RadioGroup
            aria-label="permission"
            name="permission1"
            value={privat}
            onChange={handleChange}
            disabled={props.privat === "private"}
          >
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="flex-start"
              spacing={6}
            >
              <Grid item>
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item>
        <motion.div
          initial={{ x: "100vw" }}
          animate={{ x: 0 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 50,
            duration: 1,
          }}
        >
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="stretch"
            spacing={6}
          >
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel htmlFor="email">Text 1</InputLabel>
                <OutlinedInput
                  disabled={textFields < 1}
                  fullWidth={true}
                  id="text"
                  type="text"
                  value={props.text.text1}
                  onChange={(e) => props.handleText(e.target.value, "text1")}
                  secondary
                  classes={outlinedInputClasses}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 60);
                  }}
                  labelWidth={100}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel htmlFor="email">Text 2</InputLabel>
                <OutlinedInput
                  disabled={textFields < 2}
                  fullWidth={true}
                  id="text"
                  type="text"
                  value={props.text.text2}
                  onChange={(e) => props.handleText(e.target.value, "text2")}
                  secondary
                  classes={outlinedInputClasses}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 60);
                  }}
                  labelWidth={100}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined">
                <InputLabel htmlFor="email">Text 3</InputLabel>
                <OutlinedInput
                  disabled={textFields < 3}
                  fullWidth={true}
                  id="text"
                  type="text"
                  value={props.text.text3}
                  onChange={(e) => props.handleText(e.target.value, "text3")}
                  secondary
                  classes={outlinedInputClasses}
                  labelWidth={100}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 60);
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>
      </Grid>
      <Grid item>
        <Grid container justify="center">
          <Grid item>
            <motion.div
              initial={{ x: "-100vw" }}
              animate={{ x: 0 }}
              transition={{
                delay: 0.5,
                type: "spring",
                stiffness: 50,
                duration: 0.1,
              }}
            >
              <Button
                color="secondary"
                variant="contained"
                onClick={handleSubmit}
                endIcon={<SendIcon />}
              >
                SEND
              </Button>
            </motion.div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export { FormGenerator };
