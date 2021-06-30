import React from "react";
import { Collapse, Grid, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

function ErrorAlert(props) {
  const { open, handleOpen, errorMessage } = props;
  return (
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
                  onClick={handleOpen}
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
  );
}
export { ErrorAlert };
