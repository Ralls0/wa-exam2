import React from "react";
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  FormLabel,
} from "@material-ui/core";
import { motion } from "framer-motion";

function Permission(props) {
  const { privat, handlePrivat } = props;

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
      <FormControl component="fieldset">
        <FormLabel component="legend">Permission</FormLabel>
        <RadioGroup
          aria-label="permission"
          name="permission1"
          value={privat}
          onChange={handlePrivat}
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
    </motion.div>
  );
}

export { Permission };
