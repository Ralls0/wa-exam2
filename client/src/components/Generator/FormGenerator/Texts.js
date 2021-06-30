import React from "react";
import {
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
  } from "@material-ui/core";
  import { motion } from "framer-motion";
  import { useOutlinedInputStyles } from "./styles";

function Texts(props) {
    const { textFields, text, handleText } = props;

    const outlinedInputClasses = useOutlinedInputStyles();

    return (
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
                  id="text1"
                  type="text"
                  value={text.text1}
                  onChange={(e) => handleText(e.target.value, "text1")}
                  classes={outlinedInputClasses}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 40);
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
                  id="text2"
                  type="text"
                  value={text.text2}
                  onChange={(e) => handleText(e.target.value, "text2")}
                  classes={outlinedInputClasses}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 40);
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
                  id="text3"
                  type="text"
                  value={text.text3}
                  onChange={(e) => handleText(e.target.value, "text3")}
                  classes={outlinedInputClasses}
                  labelWidth={100}
                  onInput={(e) => {
                    e.target.value = e.target.value.slice(0, 40);
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>
    );
}

export { Texts };