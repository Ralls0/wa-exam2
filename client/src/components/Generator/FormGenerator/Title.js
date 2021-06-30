import React from "react";
import {
    FormControl,
    Grid,
    InputLabel,
    OutlinedInput,
  } from "@material-ui/core";
import { motion } from "framer-motion";
import { useOutlinedInputStyles } from "./styles";

function Title(props) {
    const {title, handleTitle} =props;

    const outlinedInputClasses = useOutlinedInputStyles();

    return(
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
                  fullWidth
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => handleTitle(e.target.value)}
                  classes={outlinedInputClasses}
                  labelWidth={100}
                />
              </FormControl>
            </Grid>
          </Grid>
        </motion.div>
    );
}
export { Title };