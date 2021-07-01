import React from "react";
import { Button, Grid } from "@material-ui/core";
import { motion } from "framer-motion";
import SendIcon from "@material-ui/icons/Send";

function SubmitButton(props) {
  const { handleSubmit } = props;

  return (
    <Grid container justify="center">
      <Grid item>
        <motion.div
          initial={{ x: "100vw" }}
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
            GENERATE
          </Button>
        </motion.div>
      </Grid>
    </Grid>
  );
}

export { SubmitButton };
