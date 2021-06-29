import React from "react";
import Grid from "@material-ui/core/Grid";
import notfound from "../../img/404.png";

function NotFound() {
  return (
    <>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item>
          <img src={notfound} alt="not found" />
        </Grid>
      </Grid>
    </>
  );
}

export { NotFound };