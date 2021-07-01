import React from "react";
import { FormControl, Grid, InputLabel, NativeSelect } from "@material-ui/core";
import { motion } from "framer-motion";

function ColorFont(props) {
  const { color, handleColor, font, handleFont, fonts } = props;

  return (
    <motion.div
      initial={{ x: "-100vw" }}
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
        alignItems="center"
        spacing={3}
      >
        <Grid item>
          <input
            id="color"
            type="color"
            value={color}
            onChange={(e) => handleColor(e.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel htmlFor="demo-customized-select-native">
              Font
            </InputLabel>
            <NativeSelect
              id="fonts"
              variant="outlined"
              value={font.font}
              onChange={(event) => {
                handleFont(
                  fonts.filter((f) => {
                    return f.font === event.target.value;
                  })[0]
                );
              }}
            >
              {fonts.map((font) => {
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
    </motion.div>
  );
}

export { ColorFont };
